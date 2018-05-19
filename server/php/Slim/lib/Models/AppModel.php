<?php
/**
 * AppModel
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Validation\Factory as ValidatorFactory;
use Illuminate\Translation\FileLoader as FileLoader;
use Illuminate\Filesystem\Filesystem as Filesystem;
use Illuminate\Translation\Translator;

class AppModel extends \Illuminate\Database\Eloquent\Model
{
    public function validate($data, $rules = array(), $messages = array())
    {
        if (count($messages) == 0) {
            $messages = ['required' => 'The :attribute field is required.', 'url' => 'The :attribute must be valid URL.', 'digits' => 'The :attribute must be Digits', 'numeric' => 'The :attribute must be Number', 'min.numeric' => 'The :attribute must be minimum :min ', 'max.numeric' => 'The :attribute must be maximum :max ', 'min' => ['numeric' => 'The :attribute must be minimum :min Digit'], 'max' => ['numeric' => 'The :attribute must be maximum :max Digit'], 'date_format' => 'The :attribute does not match the format Y.', 'date' => 'The :attribute must be valid Date ', 'regex' => 'The :attribute field is invalid.'];
        }
        $translation_file_loader = new FileLoader(new Filesystem, __DIR__ . '../lang');
        $translator = new Translator($translation_file_loader, 'en.php');
        $factory = new ValidatorFactory($translator);
        if (count($rules) > 0) {
            $v = $factory->make($data, $rules, $messages);
        } else {
            $v = $factory->make($data, $this->rules, $messages);
        }
        $v->passes();
        if ($v->failed()) {
            return $v->errors();
        }
    }
    public function scopeFilter($query, $params = array())
    {
        $addedextension = '';
        if ($query->getQuery()->from == 'reviews') {
            $addedextension = 'reviews.';
        }
        $sortby = (!empty($params['sortby'])) ? $params['sortby'] : 'desc';
        if (!empty($params['fields'])) {
            $fields = explode(',', $params['fields']);
            if ($query->getQuery()->from == 'reviews') {
                $fieldsArray = array();
                foreach ($fields as $field) {
                    $fieldsArray[] = $addedextension . $field;
                }
                $fields = $fieldsArray;
            }
            $query->select($fields);
        }
        if (!empty($params['q']) && $this->qSearchFields) {
            $search_fields = $this->qSearchFields;
            $query->where(function ($q) use ($params, $search_fields, $addedextension) {
                foreach ($search_fields as $field) {
                    $search = $params['q'];
                    $q->orWhere($addedextension . $field, 'ilike', "%$search%");
                }
            });
        }
        if (!empty($params['sort'])) {
            $query->orderBy($addedextension . $params['sort'], $sortby);
        } else {
            $query->orderBy($addedextension . 'id', $sortby);
        }
        if (!empty($params['page'])) {
            $offset = ($params['page'] - 1) * PAGE_LIMIT + 1;
            $query->skip($offset)->take(PAGE_LIMIT);
        }
        $model_name = '';
        if ($query->getQuery()->from == 'cities') {
            $model_name = $query->getQuery()->from . '.';
        }
        if (!empty($params['filter']) && $params['filter'] == 'inactive') {
            $query->where($model_name . 'is_active', 0);
        }
        if (!empty($params['filter']) && $params['filter'] == 'active') {
            $query->where($model_name . 'is_active', 1);
        }
        if (!in_array($query->getQuery()->from, ['portfolios', 'jobs', 'email_templates','setting_categories'])) {
            if (!empty($params['filter']) && $params['filter'] == 'all') {
                $query->whereIn($model_name . 'is_active', array(
                    0,
                    1
                ));
            }
        }
        if (!empty($params['is_active']) && $params['is_active'] == '1') {
            $query->where($model_name . 'is_active', 1);
        }
        if (isset($params['is_active']) && $params['is_active'] == '0') {
            $query->where($model_name . 'is_active', 0);
        }
        if (!empty($params['is_admin_suspend']) && $params['is_admin_suspend'] == 'true') {
            $query->where($model_name . 'is_admin_suspend', 1);
        }
        if (isset($params['is_admin_suspend']) && $params['is_admin_suspend'] == 'false') {
            $query->where($model_name . 'is_admin_suspend', 0);
        }
        return $query;
    }
}
