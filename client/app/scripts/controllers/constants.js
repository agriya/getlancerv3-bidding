angular.module('getlancerApp.Constant', [])
    .constant('ConstUserRole', {
        'Admin': 1,
        'User': 2,
        'Employer': 3,
        'Freelancer': 4
    })
    .constant('ConstExamStatus', {
        'Inprogress': 1,
        'Incomplete': 2,
        'Passed': 3,
        'Failed': 4,
        'ExamFeePaymentPending': 5,
        'FeePaid/NotStarted': 6,
        'SuspendedDuetoTakingOvertime': 7
    })
    .constant('ConstPaymentGateways', {
        'Wallet': 1,
        'ZazPay': 2,
        'PayPal': 3
    })
    .constant('ConstDiscountType', {
        'Percentage': 1,
        'Amount': 2
    })
    .constant('ConstTransactionType', {
        'AmountAddedToWallet': 1,
        'AdminAddedAmountToUserWallet': 2,
        'AdminDeductedAmountToUserWallet': 3,
        'ProjectListingFee': 4,
        'ProjectMilestonePaymentPaid': 5,
        'ProjectMilestonePaymentReleased': 6,
        'ProjectInvoicePayment': 7,
        'AmountRefundedToWalletForCanceledProjectPayment': 8,
        'ContestListingFee': 9,
        'AmountRefundedToWalletForCanceledContest': 10,
        'AmountRefundedToWalletForRejectedContest': 11,
        'ContestFeaturesUpdatedFee': 12,
        'ContestTimeExtendedFee': 13,
        'AmountMovedToParticipant': 14,
        'JobListingFee': 15,
        'QuoteSubscriptionPlan': 16,
        'ExamFee': 17,
        'WithdrawRequested': 18,
        'WithdrawRequestApproved': 19,
        'WithdrawRequestRejected': 20,
        'WithdrawRequestCommission': 21,
        'ProjectMilestonePayment': 22
    })
     .constant('ProjectStatusConstant', {
        'Draft': 1,
        'PaymentPending': 2,
        'PendingForApproval': 3,
        'OpenForBidding': 4,
        'BiddingExpired': 5,
        'WinnerSelected': 6,
        'WaitingForEscrow': 7,
        'FundedInEscrow': 8,
        'BiddingClosed': 9,
        'EmployerCanceled': 10,
        'UnderDevelopment': 11,
        'MutuallyCanceled': 12,
        'CanceledByAdmin': 13,
        'FinalReviewPending': 14,
        'Completed': 15,
        'Closed': 16
    })
    .constant('ConstQuoteStatuses', {
        'New': 1,
        'UnderDiscussion': 2,
        'Hired': 3,
        'Completed': 4,
        'NotInterested': 5,
        'Closed': 6,
        'NotCompleted': 7
    })
    .constant('TransactionUserMessage', {
        1: 'Amount added to wallet',
        2: 'Site admin added amount to your wallet',
        3: 'Site admin deducted amount from your wallet',
        4: 'Listing fee paid for project - ##PROJECT_NAME## through ##PAYMENTGATEWAY##',
        5: '##USER## paid milestone payment to escrow for project - ##PROJECT## through ##PAYMENTGATEWAY## (Site Commission: ##COMMISSION##)',
        6: '##USER## released milestone amount from escrow for project - ##PROJECT## through ##PAYMENTGATEWAY## (Site Commission: ##COMMISSION##)',
        7: '##USER## paid invoice for project - ##PROJECT## through ##PAYMENTGATEWAY## (Site Commission: ##COMMISSION##)',
        8: 'Project amount credited to your wallet due to cancellation of project - ##PROJECT_NAME##',
        9: 'Listing fee paid for contest - ##CONTEST## through ##PAYMENTGATEWAY##',
        10: 'Contest amount credited in your wallet due to cancelation of contest - ##CONTEST##',
        11: 'Contest amount credited in your wallet due to rejection of contest - ##CONTEST##)',
        12: 'Listing features fee paid for contest - ##CONTEST## through ##PAYMENTGATEWAY##',
        13: 'Listing time extended fee paid for contest - ##CONTEST## through ##PAYMENTGATEWAY##',
        14: '##USER## paid award amount of contest - ##CONTEST## through ##PAYMENTGATEWAY##',
        15: 'Listing fee paid for job - ##JOB## through ##PAYMENTGATEWAY##',
        16: 'You have purchased - ##SUBSCRIPTION## subscription plan through ##PAYMENTGATEWAY##',
        17: 'Fee paid for Exam - ##EXAM## through ##PAYMENTGATEWAY##',
        18: 'You have requested withdraw amount from your wallet (Initiated)',
        19: 'Site admin approved your withdraw request and amount credited in your money transfer account',
        20: 'Site admin rejected your withdraw request.',
        21: 'Withdrawal fee',
        22: '##USER## paid milestone payment to escrow for project - ##PROJECT## through ##PAYMENTGATEWAY## (Site Commission: ##COMMISSION##)',
        23: '##USER## paid milestone payment to escrow for project - ##PROJECT## through ##PAYMENTGATEWAY##',
        24: '##USER## paid invoice for project - ##PROJECT## through ##PAYMENTGATEWAY##',
        25: '##USER## released milestone amount from escrow for project - ##PROJECT## through ##PAYMENTGATEWAY##',
    })
    .constant('TransactionAdminMessage', {
        7: '##USER## posted a contest ##CONTEST## with prize amount ##CONTEST_AMOUNT##. (Listing fee ##SITE_FEE##)',
        8: 'You have canceled the contest ##CONTEST## posted by ##USER## with prize amount ##CONTEST_AMOUNT##',
        9: 'You have rejected the contest ##CONTEST## posted by ##USER## with prize amount ##CONTEST_AMOUNT##',
        10: 'Contest features Update fee paid by ##USER##',
        11: 'Contest Time Extended fee paid by ##USER##',
        12: 'Prize amount ##CONTEST_AMOUNT## moved to winner (##OTHERUSER##) for completed contest ##CONTEST##'
    })
    .constant('ConstQuoteBuyOption', {
        'Enabled': 1,
        'Disabled': 0
    })
    .constant('Constyear', {
        'startyear': 35
    })
    .constant('ExamStatus', {
        'Inprogress': 1,
        'Incomplete': 2,
        'Passed': 3,
        'Failed': 4,
        'ExamFeePaymentPending': 5,
        'FeePaidOrNotStarted': 6,
        'SuspendedDueToTakingOvertime': 7,
    })
    .constant('ActivityType', {
        'MessagePosted': 1,
        'ReviewPosted': 2,
        'Notification': 3,
        'JobOpenStatus': 4,
        'JobApply': 5,
        'PortfolioPosted': 6,
        'FollowerPosted': 7,
        'QuoteRequestPosted': 8,
        'QuoteBidPosted': 9,
        'QuoteBidStatusChanged': 10,
        'QuoteBidAmountChanged': 11,
        'ProjectOpenStatusChanged': 12,
        'ProjectStatusChanged': 13,
        'ProjectWinnerSelected': 14,
        'ProjectDisputePosted': 15,
        'ProjectBidInvoicePosted': 16,
        'ProjectBidInvoicePaid': 17,
        'MilestonePosted': 18,
        'MilestoneStatuschanged': 19,
        'ContestStatusChanged': 20,
        'ContestPosted': 21,
        'ContestUserPosted': 22,
        'ProjectMutualCancelAccept': 23,
        'ProjectMutualCancelReject': 24,
        'ProjectMutualCancelRequest': 25,
        'ProjectBidPosted': 26,
        'ProjectBidFreelancerWithdrawn': 27,
        'ProjectBidStatusChanged': 28,
        'PortfolioComment': 29,
        'ProjectConversation': 30,
        'QuoteConversation': 31,
        'ContestConversation': 32,
        'QuoteBidNotInterestedStatusChanged': 34,
        'ProjectAcceptedToWork': 35,
        'ProjectRejectedToWork': 36,
        'ProjectAttachmentPosted': 37,
        'ProjectDisputeStatusChanged': 38,
        'JobStatusChanged': 39,
        'BidInvite': 40,
        'WithdrawRequested': 41,
        'WithdrawRequestStatusChange': 42
    })
    .constant('QuoteStatus', {
        'NewBid': 1,
        'UnderDiscussion': 2,
        'Hired': 3,
        'Completed': 4,
        'NotInterested': 5,
        'Closed': 6,
        'NotCompleted': 7
    })
    .constant('MilestoneStatus', {
        'Pending': 1,
        'Approved': 2,
        'RequestedForEscrow': 3,
        'EscrowFunded': 4,
        'Completed': 5,
        'RequestedForRelease': 6,
        'EscrowReleased': 7,
        'Canceled': 8,
    })
     .constant('ConstJobStatus', {
            'Draft': 1,
            'Payment pending': 2,
            'Waiting for approval ': 3,
            'Open': 4,
            'Canceled by employer': 5,
            'Expired': 6,
            'Archived': 7,
            'Canceled by admin': 8,
    })
     .constant('ConstWithdrawStatus', {
            'pending': 1,
            'under process': 2, 
            'approved and transferred to your account': 3,
            'rejected': 4,
    })
     .constant('ProjectStatuses', {
        'draft': 1,
        'payment pending': 2,
        'pending for approval': 3,
        'open for bidding': 4,
        'bidding expired': 5,
        'winner selected': 6,
        'waiting for escrow': 7,
        'funded inEscrow': 8,
        'bidding closed': 9,
        'employer canceled': 10,
        'under development': 11,
        'mutually canceled': 12,
        'canceled by admin': 13,
        'final review pending': 14,
        'completed': 15,
        'closed': 16
    })
       .constant('MilestoneStatusConstant', {
        'MilestoneSuggested': 1,
        'MilestoneSet': 2,
        'RequestedforEscrow': 3,
        'EscrowFunded': 4,
        'Completed': 5,
        'RequestedForRelease': 6,
        'EscrowReleased': 7,
        'Canceled': 8
    });
