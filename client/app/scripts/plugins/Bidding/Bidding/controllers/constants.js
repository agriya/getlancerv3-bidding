angular.module('getlancerApp.Bidding.Constant', [])
    .constant('DateFormat', {
        view: 'MMM dd',
        created_12: 'yyyy-MM-dd HH:mm',
        created_24: 'yyyy-MM-dd hh:mma',
        created: 'yyyy-MM-dd',
        title: 'MMMM dd, yyyy hh:mma (EEEE)'
    })
    .constant('ClassName', {
        invoice: 'Invoice',
        milestone: 'Milestone',
        project: 'Project',
    })
    .constant('FileFormat', {
        image: ['jpg', 'gif', 'png', 'jpeg', 'bmp'],
        resume: ['doc', 'docx', 'pdf', 'rtf', 'odt', 'docm', 'dot', 'txt'],
        project: ['doc', 'docx', 'pdf', 'rtf', 'odt', 'docm', 'dot', 'txt', 'jpg', 'gif', 'png', 'jpeg', ]
    })
    .constant('BidStatusConstant', {
        'Pending': 1,
        'Won': 2,
        'Lost': 3
    })
    .constant('BiddingMsgClass', {
        'class': 'Bid',
        'type': 'inbox'
    })
    .constant('BiddingfileClass', {
        'class': 'Project'
    })
    .constant('ExamStatusConstant', {
        'Inprogress': 1,
        'Incomplete': 2,
        'Passed': 3,
        'Failed': 4,
        'ExamFeePaymentPending': 5,
        'FeePaidNotStarted': 6,
        'SuspendedDuetoTakingOvertime': 7
    })
    .constant('PerDayExam', {
        'NumOfTime': '2'
    })
    .constant('DisputeMsgClass', {
        'class': 'ProjectDispute',
    })
    .constant('DisputeStatusConstant', {
        'Open': 1,
        'UnderDiscussion': 2,
        'WaitingforAdministratorDecision': 3,
        'Closed': 4
    })
    