<?php
/**
 * Plugin
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Core
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
/**
 * GET ExamsGet
 * Summary: Filter  exams
 * Notes: Filter exams.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        if (!isset($authUser) || (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin))) {
            $queryParams['filter'] = 'active';
        }
        $enabledIncludes = array(
            'attachment',
            'exam_level',
            'exam_categories',
            'parent_exam',
            'question_display_type'
        );
        $exams = Models\Exam::with($enabledIncludes)->Filter($queryParams);
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
             $count = Models\Exam::count();                  
        } 
        $exams = $exams->paginate($count);
        if (!empty($authUser) && $authUser->role_id == \Constants\ConstUserTypes::Admin) {
            $examModel = new Models\Exam;
            $exams->makeVisible($examModel->hidden);
        }  
        $exams = $exams->toArray();
        $data = $exams['data'];
        unset($exams['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $exams
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST exams post
 * Summary: postt exams list
 * Notes:  Post exams list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exams', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $exams = new Models\Exam($args);
    $result = array();
    try {
        $validationErrorFields = $exams->validate($args);
        if (empty($validationErrorFields)) {
            $exams->slug = Inflector::slug(strtolower($exams->title), '-');
            $exams->save();
            if (!empty($args['image'])) {
                saveImage('Exam', $args['image'], $exams->id);
            }
            if (!empty($args['image_data'])) {
                saveImageData('Exam', $args['image_data'], $exams->id);
            }
            if (!empty($exams->exam_level_id)) {
                Models\ExamLevel::where('id', $exams->exam_level_id)->increment('exam_count', 1);
            }
            $result['data'] = $exams->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, ' exams could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'exams could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExam'));
/**
 * GET exams ExamId get
 * Summary: Fetch a exams based on a exam Id
 * Notes: Returns a Exam from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams/{examId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $enabledIncludes = array(
        'attachment',
        'exam_level',
        'parent',
        'question_display_type'
    );
    $exams = Models\Exam::with($enabledIncludes)->where('id', $request->getAttribute('examId'))->first();
    if (!empty($exams)) {
        if (!empty($authUser) && $authUser->role_id == \Constants\ConstUserTypes::Admin) {
            $examModel = new Models\Exam;
            $exams->makeVisible($examModel->hidden);
        } elseif ((empty($exams['is_active']))) {
            return renderWithJson($result, 'No record found', '', 1, 404);
        }
        $result['data'] = $exams;
        if (!empty($_GET['type']) && $_GET['type'] == 'view') {
            insertViews($request->getAttribute('examId'), 'Exam');
        }
        if (!empty($authUser)) {
            $examsUsers = Models\ExamsUser::where('exam_id', $request->getAttribute('examId'))->where('user_id', $authUser->id)->where('exam_status_id', '!=', \Constants\ExamStatus::ExamFeePaymentPending)->orderBy('id', 'desc')->get();
            if (!empty($examsUsers)) {
                $result['data']['ExamsUser'] = $examsUsers;
            }
        }
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1, 404);
    }
});
/**
 * DELETE ExamsExamsIdDelete
 * Summary: Delete Exams
 * Notes: Deletes a single Exam based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exams/{examId}', function ($request, $response, $args) {
    $exams = Models\Exam::find($request->getAttribute('examId'));
    $result = array();
    try {
        if (!empty($exams)) {
            $exams->delete();
            if (!empty($exams->exam_level_id)) {
                Models\ExamLevel::where('id', $exams->exam_level_id)->decrement('exam_count', 1);
            }
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Exam could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExam'));
/**
 * PUT ExamsExamIdPut
 * Summary: Update exams
 * Notes: Update exams
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/exams/{examId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $exams = Models\Exam::find($request->getAttribute('examId'));
    $oldExamTypeId = $exams->exam_level_id;
    $validationErrorFields = $exams->validate($args);
    if (empty($validationErrorFields)) {
        $exams->fill($args);
        if ($args['exam_category_id'] != $exams->exam_category_id) {
            $exam_category_id = $exams->exam_category_id;
        }
        try {
            $exams->save();
            if (!empty($args['image'])) {
                saveImage('Exam', $args['image'], $exams->id);
            }
            if (!empty($args['image_data'])) {
                saveImageData('Exam', $args['image_data'], $exams->id);
            }
            Models\Exam::examCategoryCountUpdation($exams->exam_category_id);
            if (!empty($exam_category_id)) {
                /** Exam old category count updation**/
                Models\Exam::examCategoryCountUpdation($exam_category_id);
            }
            if ($oldExamTypeId != $exams->exam_level_id) {
                Models\ExamLevel::where('id', $oldExamTypeId)->decrement('exam_count', 1);
                Models\ExamLevel::where('id', $exams->exam_level_id)->increment('exam_count', 1);
            }
            $result['data'] = $exams->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Exam could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Exam could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateExam'));
/**
 * GET exams ExamId get
 * Summary: Fetch a exams based on a exam Id
 * Notes: Returns a Exam from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams/{examId}/questions', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $examsUserCount = Models\ExamsUser::where('user_id', $authUser['id'])->where('exam_id', $request->getAttribute('examId'))->whereIn('exam_status_id', [\Constants\ExamStatus::FeePaidOrNotStarted, \Constants\ExamStatus::Inprogress])->count();
        if (!empty($examsUserCount)) {
            $examsQuestion = Models\ExamsQuestion::select('question_id')->where('exam_id', $request->getAttribute('examId'))->get()->toArray();
            $count = PAGE_LIMIT;
            if (!empty($queryParams['limit']) && $queryParams['limit'] != 'all') {
                $count = $queryParams['limit'];
            }
            if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
                $question = Models\Question::with(array(
                    'exam_answer' => function ($query) use ($authUser, $request) {
                        $query->where('exam_answers.user_id', $authUser['id']);
                        $query->where('exam_answers.exam_id', $request->getAttribute('examId'));
                    }
                ))->whereIn('id', $examsQuestion)->get()->toArray();
            } else {
                $question = Models\Question::with(array(
                    'exam_answer' => function ($query) use ($authUser, $request) {
                        $query->where('exam_answers.user_id', $authUser['id']);
                        $query->where('exam_answers.exam_id', $request->getAttribute('examId'));
                    }
                ))->whereIn('id', $examsQuestion)->paginate($count)->toArray();
            }
            if (!empty($question)) {
                if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
                    $result['data'] = $question;
                } else {
                    $data = $question['data'];
                    unset($question['data']);
                    $result = array(
                        'data' => $data,
                        '_metadata' => $question
                    );
                }
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'No record found', '', 1);
            }
        } else {
            return renderWithJson($result, 'Exam could not be Found. Access Denied', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam could not be Found. Please, try again.', '', 1);
    }
})->add(new ACL('canListExamsQuestions'));
/**
 * DELETE examCategoriesExamCategoryIdDelete
 * Summary: Delete exam category
 * Notes: Deletes a single exam category based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exam_categories/{examCategoryId}', function ($request, $response, $args) {
    $examCategory = Models\ExamCategory::find($request->getAttribute('examCategoryId'));
    try {
        $examCategory->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam category could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExamCategory'));
/**
 * GET examCategoriesExamCategoryIdGet
 * Summary: Fetch exam category
 * Notes: Returns a exam category based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_categories/{examCategoryId}', function ($request, $response, $args) {
    $result = array();
    $examCategory = Models\ExamCategory::find($request->getAttribute('examCategoryId'))->first();
    if (!empty($examCategory)) {
        $result['data'] = $examCategory;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewExamCategory'));
/**
 * PUT examCategoriesExamCategoryIdPut
 * Summary: Update exam category by its id
 * Notes: Update exam category by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/exam_categories/{examCategoryId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $examCategory = Models\ExamCategory::find($request->getAttribute('examCategoryId'));
    $examCategory->fill($args);
    $result = array();
    try {
        $validationErrorFields = $examCategory->validate($args);
        if (empty($validationErrorFields)) {
            $examCategory->save();
            $result = $examCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Exam category could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam category could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateExamCategory'));
/**
 * GET examCategoriesGet
 * Summary: Fetch all exam categories
 * Notes: Returns all exam categories from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_categories', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $examCategories = new Models\ExamCategory;
        if (!empty($queryParams['type']) && $queryParams['type'] == 'with_exams') {
            $enabledIncludes = array(
                'exam'
            );
            $examCategories = $examCategories->with($enabledIncludes);
        }
        $examCategories = $examCategories->Filter($queryParams)->paginate($count)->toArray();
        $data = $examCategories['data'];
        unset($examCategories['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $examCategories
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST examCategoriesPost
 * Summary: Creates a new exam category
 * Notes: Creates a new exam category
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exam_categories', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $examCategory = new Models\ExamCategory($args);
    $result = array();
    try {
        $validationErrorFields = $examCategory->validate($args);
        if (empty($validationErrorFields)) {
            $examCategory->save();
            $result = $examCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Exam category could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam category could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExamCategory'));
/**
 * GET ExamLevelsGet
 * Summary: Filter  ExamLevels
 * Notes: Filter ExamLevels.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_levels', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $examLevels = Models\ExamLevel::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $examLevels['data'];
        unset($examLevels['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $examLevels
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListExamLevel'));
/**
 * POST ExamLevels post
 * Summary: postt ExamLevels list
 * Notes:  Post examLevels list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exam_levels', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $examLevels = new Models\ExamLevel($args);
    $result = array();
    try {
        $validationErrorFields = $examLevels->validate($args);
        if (empty($validationErrorFields)) {
            $examLevels->save();
            $result['data'] = $examLevels->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, ' Exam Levels could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam Levels could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExamLevel'));
/**
 * GET examLevels ExamLevelId get
 * Summary: Fetch a ExamLevels based on a exam Id
 * Notes: Returns a ExamLevel from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_levels/{examLevelId}', function ($request, $response, $args) {
    $examLevels = Models\ExamLevel::find($request->getAttribute('examLevelId'));
    $result['data'] = $examLevels->toArray();
    return renderWithJson($result);
})->add(new ACL('canViewExamLevel'));
/**
 * DELETE ExamLevelsExamLevelsIdDelete
 * Summary: Delete Exam Levels
 * Notes: Deletes a single ExamLevel based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exam_levels/{examLevelId}', function ($request, $response, $args) {
    $examLevels = Models\ExamLevel::find($request->getAttribute('examLevelId'));
    try {
        $examLevels->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam Level could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExamLevel'));
/**
 * PUT ExamLevelsExamLevelIdPut
 * Summary: Update examLevels
 * Notes: Update examLevels
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/exam_levels/{examLevelId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $examLevels = Models\ExamLevel::find($request->getAttribute('examLevelId'));
    $validationErrorFields = $examLevels->validate($args);
    if (empty($validationErrorFields)) {
        $examLevels->fill($args);
        try {
            $examLevels->save();
            $result['data'] = $examLevels->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Exam Level could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Exam Level could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateExamLevel'));
/**
 * GET ExamUsersGet
 * Summary: Filter  ExamUsers
 * Notes: Filter ExamUsers.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams_users', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $enabledIncludes = array(
            'exam',
            'user',
            'exam_level',
            'exam_status'
        );
        $examUsers = Models\ExamsUser::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $examUsers['data'];
        unset($examUsers['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $examUsers
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST ExamUsers post
 * Summary: postt ExamUsers list
 * Notes:  Post examUsers list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exams_users', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $examUsers = new Models\ExamsUser($args);
    $exams_users = array(
        'payment_gateway_id',
        'gateway_id',
        'buyer_name',
        'buyer_email',
        'buyer_address',
        'buyer_city',
        'buyer_state',
        'buyer_country_iso2',
        'buyer_phone',
        'buyer_zip_code',
        'credit_card_code',
        'credit_card_expire',
        'credit_card_name_on_card',
        'credit_card_number'
    );
    $result = array();
    try {
        $validationErrorFields = $examUsers->validate($args);
        if (empty($validationErrorFields)) {
            $exam = Models\Exam::select('title', 'fee', 'exams_question_count', 'duration', 'exam_level_id', 'pass_mark_percentage', 'parent_exam_id')->find($args['exam_id']);
            if (!empty($exam)) {
                $examUsers->user_id = $authUser->id;
                if (MAX_NUMBER_OF_EXAM_PER_USER_PER_DAY != null) {
                    $examsUserPerDay = Models\ExamsUser::where('user_id', $authUser->id)->where('exam_status_id', '!=', Constants\ExamStatus::ExamFeePaymentPending)->where('created_at', '>=', date('Y-m-d') . ' 00:00:00')->count();
                    if ($examsUserPerDay >= MAX_NUMBER_OF_EXAM_PER_USER_PER_DAY) {
                        return renderWithJson($result, 'Your limit of skill test attending per day is over. Please try again by tomorrow.', '', 1);
                    }
                }
                if (REATTEMPT_DURATION) {
                    $examsUserPreviousRecord = Models\ExamsUser::select('created_at')->where('user_id', $authUser->id)->where('exam_id', $args['exam_id'])->where('exam_status_id', '!=', Constants\ExamStatus::ExamFeePaymentPending)->orderBy('id', 'desc')->first();
                    if (!empty($examsUserPreviousRecord)) {
                        $createdAt = strtotime($examsUserPreviousRecord->created_at);
                        $datediff = time() - $createdAt;
                        $dayTaken = floor($datediff / (60 * 60 * 24));
                        if ($dayTaken < REATTEMPT_DURATION) {
                            return renderWithJson($result, 'You must wait for taking retest minimum ' . REATTEMPT_DURATION . ' day(s) from last attempt.', '', 1);
                        }
                    }
                }
                $previousExamsUserCount = 0;
                $max_number_of_time_per_user_per_exam = MAX_NUMBER_OF_TIME_PER_USER_PER_EXAM;
                if (!empty(IS_FEE_NEEDED_FOR_RERATTEMPTS) || !empty($max_number_of_time_per_user_per_exam)) {
                    $previousExamsUserCount = Models\ExamsUser::where('exam_id', $args['exam_id'])->where('user_id', $authUser->id)->whereIn('exam_status_id', [\Constants\ExamStatus::Incomplete, \Constants\ExamStatus::Failed, \Constants\ExamStatus::SuspendedDueToTakingOvertime])->count();
                }
                if (isset($max_number_of_time_per_user_per_exam) && $max_number_of_time_per_user_per_exam != null && $max_number_of_time_per_user_per_exam < $previousExamsUserCount) {
                    return renderWithJson($result, 'You already tried this exam. So you can\'t try again.', '', 1);
                }
                if (IS_ENABLED_HIERARCHY_LEVEL_ATTENDING_EXAM) {
                    if (!empty($exam['parent_exam_id'])) {
                        $isCompletedFirstLevelExam = Models\ExamsUser::where('exam_id', $exam['parent_exam_id'])->where('user_id', $authUser->id)->where('exam_status_id', \Constants\ExamStatus::Passed)->count();
                        if (empty($isCompletedFirstLevelExam)) {
                            $firstLevelExam = Models\Exam::select('title')->where('id', $exam['parent_exam_id'])->first();
                            return renderWithJson($result, 'You must complete the exam in order of difficulty. So please complete ' . $firstLevelExam->title . ' before trying ' . $exam->title . ' test.', '', 1);
                        }
                    }
                }
                $examUsers->exam_level_id = $exam->exam_level_id;
                $examUsers->allow_duration = $exam->duration;
                $examUsers->pass_mark_percentage = $exam->pass_mark_percentage;
                $examUsers->total_question_count = $exam->exams_question_count;
                if (empty($exam->fee) || $exam->fee == '0.00' || (!(IS_FEE_NEEDED_FOR_RERATTEMPTS) && $previousExamsUserCount)) {
                    $examUsers->exam_status_id = \Constants\ExamStatus::FeePaidOrNotStarted;
                    $examUsers->save();
                    $result['data'] = $examUsers->toArray();
                } else {
                    $examUsers->exam_status_id = \Constants\ExamStatus::ExamFeePaymentPending;
                    $examUsers->save();
                    if (!empty($exam->fee) && !empty($args['payment_gateway_id'])) {
                        $args['description'] = $args['name'] = $exam->title;
                        $args['original_price'] = $args['amount'] = $exam->fee;
                        $args['id'] = $examUsers->id;
                        $args['user_id'] = isset($args['user_id']) ? $args['user_id'] : $authUser->id;
                        $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/ExamsUser/' . $examUsers->id . '/' . md5(SECURITY_SALT . $examUsers->id . SITE_NAME);
                        $args['success_url'] = $_server_domain_url . '/exams_users?error_code=0';
                        $args['cancel_url'] = $_server_domain_url . '/exams_users?error_code=512';
                        $result = Models\Payment::processPayment($examUsers->id, $args, 'ExamsUser');
                    } else {
                        $examUsers = Models\ExamsUser::with('exam')->find($examUsers->id);
                        $result['data'] = $examUsers->toArray();
                    }
                }
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Exam Users could not be added. Exam Not Found.', '', 1);
            }
        } else {
            return renderWithJson($result, 'Exam Users could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam Users could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExamUser'));
/**
 * GET examUsers ExamUserId get
 * Summary: Fetch a ExamUsers based on a exam Id
 * Notes: Returns a ExamUser from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams_users/{examsUserId}', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $enabledIncludes = array(
        'exam',
        'user',
        'exam_level',
        'exam_status'
    );
    $examUsers = Models\ExamsUser::with($enabledIncludes);
    if ($authUser->role_id != \Constants\ConstUserTypes::Admin) {
        $examUsers = $examUsers->where('user_id', $authUser->id);
    }
    $examUsers = $examUsers->find($request->getAttribute('examsUserId'));
    $result = array();
    try {

        if (!empty($examUsers)) {
            if (!empty($queryParams['is_exam_started'])) {
                if (!IS_ALLOW_TO_RECONTINUE_SKILL_TEST) {
                    if ($examUsers->no_of_times) {
                        return renderWithJson($result, "Your can't restart the test.", '', 1);
                    }
                } else {
                    $max_number_of_time_user_can_recontinue = MAX_NUMBER_OF_TIME_USER_CAN_RECONTINUE;
                    if (!empty($max_number_of_time_user_can_recontinue) || $max_number_of_time_user_can_recontinue === 0) {
                        if ($examUsers->no_of_times > $max_number_of_time_user_can_recontinue) {
                            return renderWithJson($result, "Your can't restart the test.", '', 1);
                        }
                    }       
                }     
                $examAttend = new Models\ExamAttend;
                $examAttend->exam_id = $examUsers->exam_id;
                $examAttend->exams_user_id = $request->getAttribute('examsUserId');
                $examAttend->user_id = $authUser->id;
                $examAttend->user_login_ip_id = saveIp();
                $examAttend->save();
                if ($examUsers->exam_status_id == \Constants\ExamStatus::FeePaidOrNotStarted) {
                    $examUsers->exam_started_date =date('Y-m-d H:i:s');
                    $examUsers->exam_status_id = \Constants\ExamStatus::Inprogress;
                }
                $examUsers->save();
                $examAttendCount = Models\ExamAttend::where('user_id', $authUser->id)->where('exam_id', $examUsers->exam_id)->where('exams_user_id', $request->getAttribute('examsUserId'))->count();
            }
            
            if ($examUsers->no_of_times == 0) {
                $remaining_exam_duration = $examUsers['exam']['duration'];
            } else {
                $expire_time = '';
                $takenMin = 0;
                $examAttends = Models\ExamAttend::select('created_at', 'updated_at')->where('user_id', $authUser->id)->where('exam_id', $examUsers->exam_id)->where('exams_user_id', $request->getAttribute('examsUserId'))->get();
                foreach ($examAttends as $examAttend) {
                    $takenMin+= abs(strtotime($examAttend['modified_at']) - strtotime($examAttend['created_at']));
                }
                if (IS_ENABLED_EXPIRE_TIME_FOR_EXAM) {
                    if ($examUsers['exam']['additional_time_to_expire'] != null) {
                        $expire_time = strtotime($examUsers->exam_started_date . ' + ' . $examUsers->allow_duration . ' min  +' . $examUsers['exam']['additional_time_to_expire'] . ' min');
                    }
                }
                if (empty($expire_time)) {
                    $remainingTime = ($examUsers->duration * 60) - $takenMin;
                } else {
                    if (strtotime('now') < $expire_time) {
                        $remainingExamDuration = strtotime($examUsers->exam_started_date . ' + ' . $examUsers['exam']['duration'] . ' minutes + ' . $examUsers['exam']['additional_time_to_expire'] . ' minutes') - strtotime('now');
                        $remainingUserTakenTime = (($examUsers['exam']['duration'] * 60) - $takenMin);
                        if ($remainingExamDuration <= $remainingUserTakenTime) {
                            $remainingTime = $remainingExamDuration;
                        } else {
                            $remainingTime = $remainingUserTakenTime;
                        }
                    }
                }
                $examUsers['remainingUserTakenTime'] = $remainingUserTakenTime;
            }
            $examsQuestion = Models\ExamsQuestion::select('question_id')->where('exam_id', $examUsers->exam_id)->get()->toArray();
            $result['data'] = $examUsers;
            if ($examUsers->exam_status_id == \Constants\ExamStatus::Inprogress || $examUsers->exam_status_id == \Constants\ExamStatus::FeePaidOrNotStarted && !empty($queryParams['is_exam_started'])) {
                $questions = Models\Question::with(array(
                    'question_answer_options',
                    'exam_answer' => function ($query) use ($authUser, $request) {
                        $query->where('exam_answers.exams_user_id', $request->getAttribute('examsUserId'));
                    }
                ))->whereIn('id', $examsQuestion)->get();
                if (!empty($questions)) {
                    $questionsNew = $questions;
                    $questions = $questions->map(function ($question) {
                        if (!empty($question->question_answer_options)) {
                            $question_answer_options = $question->question_answer_options;
                            foreach ($question_answer_options as $key => $question_answer_option) {
                                unset($question_answer_options[$key]['is_correct_answer']);
                            }
                        }
                        $questionsNew = $question;
                        return $question;
                    });
                    $result['data']['Question'] = $questionsNew->toArray();
                }
            }
            if(isset($examAttendCount)) {
                Models\ExamsUser::where('id', $request->getAttribute('examsUserId'))->update(array(
                    'no_of_times' => $examAttendCount
                ));
            }
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Exam could not be Found. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam could not be Found. Please, try again.', '', 1);
    }
})->add(new ACL('canViewExamUser'));
/**
 * DELETE ExamUsersExamUsersIdDelete
 * Summary: Delete Exam Users
 * Notes: Deletes a single ExamUser based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exams_users/{examsUserId}', function ($request, $response, $args) {
    $examUsers = Models\ExamsUser::find($request->getAttribute('examsUserId'));
    try {
        $examUsers->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam User could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExamUser'));
/**
 * GET Jobs Get
 * Summary: Fetch all Jobs
 * Notes: Returns all Jobs from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/me/exams_users', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $queryParams = $request->getQueryParams();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    $enabledIncludes = array(
        'exam',
        'exam_status'
    );
    $exams = Models\ExamsUser::with($enabledIncludes)->where('exam_status_id', '!=', \Constants\ExamStatus::ExamFeePaymentPending)->where('user_id', $authUser['id'])->Filter($queryParams)->paginate($count)->toArray();
    if (!empty($exams)) {
        $data = $exams['data'];
        unset($exams['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $exams
        );
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUserViewExamsUsers'));
/**
 * PUT ExamUsersExamUserIdPut
 * Summary: Update examUsers
 * Notes: Update examUsers
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/exams_users/{examsUserId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $examUsers = Models\ExamsUser::find($request->getAttribute('examsUserId'));
    $validationErrorFields = $examUsers->validate($args);
    if (empty($validationErrorFields)) {
        $examUsers->fill($args);
        try {
            $examUsers->save();
            $result['data'] = $examUsers->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Exam User could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Exam User could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateExamUser'));
/**
 * GET ExamAnswersGet
 * Summary: Filter  ExamAnswers
 * Notes: Filter ExamAnswers.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_answers', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $enabledIncludes = array(
            'exam',
            'exams_user',
            'user',
            'question'
        );
        $examAnswers = Models\ExamAnswer::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $examAnswers['data'];
        unset($examAnswers['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $examAnswers
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListExamAnswer'));
/**
 * POST ExamAnswers post
 * Summary: postt ExamAnswers list
 * Notes:  Post examAnswers list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exam_answers', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $result = array();
    try {
         // This is commented due to allow auto call for updating update_at time
        /*if (empty($args['user_answer'])) {
            $validationErrorFields['user_answer'] = array(
                'User Answer Required'
            );
        }*/
        $lastExamAttend = Models\ExamAttend::where('exams_user_id', $args['exams_user_id'])->orderBy('id', 'DESC')->first();
        if (!empty($lastExamAttend)) {
            $lastExamAttend->updated_at = date('Y-m-d H:i:s');
            $lastExamAttend->save();            
        }        
        if (empty($validationErrorFields)) {
            foreach ($args['user_answer'] as $user_answer) {
                $examAnswersId = Models\ExamAnswer::select('id')->where('question_id', $user_answer['question_id'])->where('exams_user_id', $args['exams_user_id'])->first();
                if (!empty($examAnswersId)) {
                    $examAnswers = Models\ExamAnswer::find($examAnswersId->id);
                } else {
                    $examAnswers = new Models\ExamAnswer;
                    $examAnswers->user_id = $authUser['id'];
                }
                $examAnswers->exams_user_id = $args['exams_user_id'];
                $examAnswers->question_id = $user_answer['question_id'];
                $examAnswers->user_answer = $user_answer['answer'];
                if ($examAnswers->save()) {
                    Models\ExamAnswer::updateMarkAndStatus($args['exams_user_id'], $user_answer['question_id'], $user_answer['answer']);
                    $result['data'][] = $examAnswers->toArray();
                } else {
                    return renderWithJson($result, 'Exam Answers could not be added. Access Denied.', '', 1);
                }
            }
            $enabledIncludes = array(
                'exam',
                'exam_status'
            );
            $examsUser = Models\ExamsUser::with($enabledIncludes)->find($args['exams_user_id']);
            $examAttends = Models\ExamAttend::where('exams_user_id', $args['exams_user_id'])->select('created_at', 'updated_at')->get();
            $takenMin = 0;
            foreach ($examAttends as $examAttend) {
                $takenMin+= round(abs(strtotime($examAttend->updated_at) - strtotime($examAttend->created_at)) / 60, 2);
            }
            $expire_time = null;
            if (IS_ENABLED_EXPIRE_TIME_FOR_EXAM) {
                if ($examsUser->exam->additional_time_to_expire != null) {
                    $expire_time = strtotime($examsUser->exam_started_date . ' + ' . $examsUser->allow_duration . ' min  +' . $examsUser->exam->additional_time_to_expire . ' min + 10 sec');
                }
            }
            $examsUser->taken_time = $takenMin;
            $examsUser->save();         
            if (!empty($args['is_exam_completed']) && $args['is_exam_completed'] == 1) {
                Models\ExamAnswer::updateMarkAndStatus($args['exams_user_id']);                
                if ((!empty($expire_time) && strtotime('now') > $expire_time) || ($takenMin * 60) > (($examsUser->allow_duration * 60) + 10)) {
                    $examsUser->exam_status_id = \Constants\ExamStatus::SuspendedDueToTakingOvertime;
                }
                $examsUser->exam_end_date = date('Y-m-d H:i:s');
                $examsUser->save();
                $result['data']['ExamsUser'] = $examsUser;
            }
            return renderWithJson($result);
        } else {
            return renderWithJson($result, ' Exam Answers could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam Answers could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExamAnswer'));
/**
 * GET examAnswers ExamAnswerId get
 * Summary: Fetch a ExamAnswers based on a exam Id
 * Notes: Returns a ExamAnswer from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_answers/{examAnswerId}', function ($request, $response, $args) {
    $enabledIncludes = array(
        'exam',
        'user',
        'exams_user',
        'question'
    );
    $examAnswers = Models\ExamAnswer::with($enabledIncludes)->find($request->getAttribute('examAnswerId'));
    $result['data'] = $examAnswers->toArray();
    return renderWithJson($result);
})->add(new ACL('canViewExamAnswer'));
/**
 * DELETE ExamAnswersExamAnswersIdDelete
 * Summary: Delete Exam Answers
 * Notes: Deletes a single ExamAnswer based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exam_answers/{examAnswerId}', function ($request, $response, $args) {
    $examAnswers = Models\ExamAnswer::find($request->getAttribute('examAnswerId'));
    try {
        $examAnswers->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Exam Answer could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExamAnswer'));
/**
 * GET ExamsQuestionsGet
 * Summary: Filter  ExamsQuestions
 * Notes: Filter ExamsQuestions.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams_questions', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $examsQuestions = Models\ExamsQuestion::with('exam', 'question')->Filter($queryParams)->paginate($count)->toArray();
        $data = $examsQuestions['data'];
        unset($examsQuestions['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $examsQuestions
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListExamsQuestion'));
/**
 * POST ExamsQuestions post
 * Summary: postt ExamsQuestions list
 * Notes:  Post examsQuestions list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/exams_questions', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $examsQuestions = new Models\ExamsQuestion($args);
    $result = array();
    try {
        $validationErrorFields = $examsQuestions->validate($args);
        if (empty($validationErrorFields)) {
            $examsQuestions->save();
            $result['data'] = $examsQuestions->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, ' Exams Questions could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Exams Questions could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateExamsQuestion'));
/**
 * GET examsQuestions ExamsQuestionId get
 * Summary: Fetch a ExamsQuestions based on a exam Id
 * Notes: Returns a ExamsQuestion from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exams_questions/{examsQuestionId}', function ($request, $response, $args) {
    $examsQuestions = Models\ExamsQuestion::with('exam', 'question')->find($request->getAttribute('examsQuestionId'));
    $result['data'] = $examsQuestions->toArray();
    return renderWithJson($result);
})->add(new ACL('canViewExamsQuestion'));
/**
 * DELETE ExamsQuestionsExamsQuestionsIdDelete
 * Summary: Delete Exams Questions
 * Notes: Deletes a single ExamsQuestion based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/exams_questions/{examsQuestionId}', function ($request, $response, $args) {
    $examsQuestions = Models\ExamsQuestion::find($request->getAttribute('examsQuestionId'));
    try {
        $examsQuestions->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Exams Question could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteExamsQuestion'));
/**
 * PUT ExamsQuestionsExamsQuestionIdPut
 * Summary: Update examsQuestions
 * Notes: Update examsQuestions
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/exams_questions{examsQuestionId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $examsQuestions = Models\ExamsQuestion::find($request->getAttribute('examsQuestionId'));
    $validationErrorFields = $examsQuestions->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $examsQuestions->{$key} = $arg;
        }
        try {
            $examsQuestions->save();
            $result['data'] = $examsQuestions->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Exams Question could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Exams Question could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateExamsQuestion'));
/**
 * GET QuestionsGet
 * Summary: Filter  questions
 * Notes: Filter questions.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/questions', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $enabledIncludes = array(
            'question_category',
            'question_answer_options'
        );
        $questions = Models\Question::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $questions['data'];
        unset($questions['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $questions
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListQuestion'));
/**
 * POST questions post
 * Summary: postt supervisors list
 * Notes:  Post supervisors list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/questions', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $questions = new Models\Question($args);
    $result = array();
    try {
        $validationErrorFields = $questions->validate($args);
        if (empty($validationErrorFields) && !empty($args['answer_options'])) {
            $questions->save();
            $answer_options = explode(",", $args['answer_options']);
            foreach ($answer_options as $answer_option) {
                $questionAnswerOptions = new Models\QuestionAnswerOptions;                
                $questionAnswerOptions->question_id = $questions->id;
                $questionAnswerOptions->option = trim($answer_option);
                  $questionAnswerOptions->is_correct_answer = 0;
                if (!empty($args['current_answer']) && trim($args['current_answer']) == trim($answer_option)) {
                    $questionAnswerOptions->is_correct_answer = 1;
                }
                $questionAnswerOptions->save();
            }
            $result['data'] = $questions->toArray();
            return renderWithJson($result);
        } else {
            if (empty($args['answer_options'])) {
                $validationErrorFields['answer_options'] = array(
                    'Answer Options Needed'
                );
            }
            return renderWithJson($result, ' question could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'question could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateQuestion'));
/**
 * GET questionsQuestionId get
 * Summary: Fetch a question based on a question Id
 * Notes: Returns a Question from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/questions/{questionId}', function ($request, $response, $args) {
    $enabledIncludes = array(
        'question_category',
        'question_answer_options'
    );
    $result = array();
    $questions = Models\Question::with($enabledIncludes)->find($request->getAttribute('questionId'));
    if (!empty($questions)) {
        $questions->answer_options = '';
        $questions->current_answer = '';
        if (!empty($questions) && !empty($questions->question_answer_options)) {
            $answer_options = '';
            foreach ($questions->question_answer_options as $question_answer_options) {
                $answer_options .= $question_answer_options->option. ',';
                if (!empty($question_answer_options->is_correct_answer)) {
                    $questions->current_answer = $question_answer_options->option;
                }
            }
            $questions->answer_options = rtrim($answer_options,',');
        }
        $result['data'] = $questions->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'Question could not be Found.', '', 1, 404);
    }
})->add(new ACL('canViewQuestion'));
/**
 * DELETE QuestionsQuestionsIdDelete
 * Summary: Delete Questions
 * Notes: Deletes a single Question based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/questions/{questionId}', function ($request, $response, $args) {
    $questions = Models\Question::find($request->getAttribute('questionId'));
    $result = array();
    try {
        if (!empty($questions)) {
            $questions->delete();
            Models\QuestionAnswerOptions::where('question_id', $request->getAttribute('questionId'))->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Question could not be Found.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Question could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteQuestion'));
/**
 * PUT QuestionsQuestionIdPut
 * Summary: Update question by admin
 * Notes: Update question by admin
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/questions/{questionId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $questions = Models\Question::find($request->getAttribute('questionId'));
    $question_category_id = '';
    if (!empty($args['question_category_id']) && ($questions->question_category_id != $args['question_category_id'])) {
        $question_category_id = $questions->question_category_id;
    }
    $validationErrorFields = $questions->validate($args);
    if (empty($validationErrorFields)) {
        $questions->fill($args);
        try {
            $questions->save();
            /** Question category count updation**/
            if (!empty($question_category_id)) {
                Models\Question::questionCategoryCountUpdation($question_category_id);
            }
            Models\Question::questionCategoryCountUpdation($questions->question_category_id);
            if (!empty($args['answer_options'])) {
                Models\QuestionAnswerOptions::where('question_id', $request->getAttribute('questionId'))->delete();
                $answer_options = explode(",", $args['answer_options']);
                foreach ($answer_options as $answer_option) {
                    $questionAnswerOptions = new Models\QuestionAnswerOptions;                
                    $questionAnswerOptions->question_id = $questions->id;
                    $questionAnswerOptions->option = trim($answer_option);
                    $questionAnswerOptions->is_correct_answer = 0;
                    if (!empty($args['current_answer']) && trim($args['current_answer']) == trim($answer_option)) {
                        $questionAnswerOptions->is_correct_answer = 1;
                    }
                    $questionAnswerOptions->save();
                }
            }
            $result['data'] = $questions->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Question could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Question could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateQuestion'));
/**
 * GET QuestionCategorysGet
 * Summary: Filter  questionCategory
 * Notes: Filter questionCategory.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/question_categories', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    try {
        $questionCategory = Models\QuestionCategory::Filter($queryParams);
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
            $questionCategory = $questionCategory->get()->toArray();
            $result['data'] = $questionCategory;
        } else {
            $questionCategory = $questionCategory->paginate($count)->toArray();
            $data = $questionCategory['data'];
            unset($questionCategory['data']);
            $result = array(
                'data' => $data,
                '_metadata' => $questionCategory
            );
        }
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListQuestionCategory'));
/**
 * POST questionCategory post
 * Summary: postt supervisors list
 * Notes:  Post supervisors list
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/question_categories', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $questionCategory = new Models\QuestionCategory($args);
    $result = array();
    try {
        $validationErrorFields = $questionCategory->validate($args);
        if (empty($validationErrorFields)) {
            $questionCategory->save();
            $result['data'] = $questionCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, ' Question Category could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Question Category could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateQuestionCategory'));
/**
 * GET questionCategoryQuestionCategoryId get
 * Summary: Fetch a Question Categorybased on a Question CategoryId
 * Notes: Returns a QuestionCategory from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/question_categories/{questionCategoryId}', function ($request, $response, $args) {
    $questionCategory = Models\QuestionCategory::find($request->getAttribute('questionCategoryId'));
    $result['data'] = $questionCategory->toArray();
    return renderWithJson($result);
})->add(new ACL('canViewQuestionCategory'));
/**
 * DELETE QuestionCategoryQuestionCategoryIdDelete
 * Summary: Delete QuestionCategory
 * Notes: Deletes a single QuestionCategory based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/question_categories/{questionCategoryId}', function ($request, $response, $args) {
    $questionCategory = Models\QuestionCategory::find($request->getAttribute('questionCategoryId'));
    try {
        $questionCategory->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Question Category could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteQuestionCategory'));
/**
 * PUT QuestionCategorysQuestionCategoryIdPut
 * Summary: Update Question Categoryby admin
 * Notes: Update Question Categoryby admin
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/question_categories/{questionCategoryId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $questionCategory = Models\QuestionCategory::find($request->getAttribute('questionCategoryId'));
    $validationErrorFields = $questionCategory->validate($args);
    if (empty($validationErrorFields)) {
        $questionCategory->fill($args);
        try {
            $questionCategory->save();
            $result['data'] = $questionCategory->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Question Category could not be updated. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Question Category could not be updated. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateQuestionCategory'));
/**
 * GET QuestionDisplayType GET
 * Summary: Filter  Question Display Type
 * Notes: Filter Question Display Type
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/question_display_types', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $questionDisplayTypes = Models\QuestionDisplayType::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $questionDisplayTypes['data'];
        unset($questionDisplayTypes['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $questionDisplayTypes
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListQuestionDisplayType'));
/**
 * GET QuestionDisplayType get
 * Summary: Fetch a  QuestionDisplayType on a Question QuestionDisplayType
 * Notes: Returns a QuestionDisplayType from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/question_display_types/{questionDisplayTypeId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $questionDisplayType = Models\QuestionDisplayType::find($request->getAttribute('questionDisplayTypeId'));
    if (!empty($questionDisplayType)) {
        $result['data'] = $questionDisplayType->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canViewQuestionDisplayType'));
/**
 * GET examStatusesGet
 * Summary: Fetch all exam_statuses
 * Notes: Returns all exam_statuses from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/exam_statuses', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $examStatus = Models\ExamStatus::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $examStatus['data'];
        unset($examStatus['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $examStatus
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
