<?php
/**
 * Constants configurations
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
namespace Constants;

class ConstUserTypes
{
    const Admin = 1;
    const User = 2;
    const Employer = 3;
    const Freelancer = 4;
}
class UserCashWithdrawStatus
{
    const Pending = 1;
    const UnderProcess = 2;
    const Approved = 3;
    const Rejected = 4;
}
class SocialLogins
{
    const Twitter = 1;
    const Facebook = 2;
    const GooglePlus = 3;
}
class PaymentGateways
{
    const Wallet = 1;
    const ZazPay = 2;
    const PayPalREST = 3;
}
class QuoteStatus
{
    const NewBid = 1;
    const UnderDiscussion = 2;
    const Hired = 3;
    const Completed = 4;
    const NotInterested = 5;
    const Closed = 6;
    const NotCompleted = 7;
}
class ConstContestStatus
{
    const PaymentPending = 1;
    const PendingApproval = 2;
    const Open = 3;
    const Rejected = 4;
    const RefundRequest = 5;
    const CanceledByAdmin = 6;
    const Judging = 7;
    const WinnerSelected = 8;
    const WinnerSelectedByAdmin = 9;
    const ChangeRequested = 10;
    const ChangeCompleted = 11;
    const ExpectingDeliverables = 12;
    const DeliveryFilesUploaded = 13;
    const Completed = 14;
    const PaidToParticipant = 15;
    const PendingActionToAdmin = 16;
}
class ConstContestUserStatus
{
    const Active = 1;
    const Won = 2;
    const Lost = 3;
    const Withdrawn = 4;
    const Eliminated = 5;
    const Deleted = 6;
}
class ConstResource
{
    const Image = 1;
    const Video = 2;
    const Audio = 3;
    const Text = 4;
}
class ConstUploadServiceType
{
    const Direct = 1;
    const Normal = 2;
}
class ConstUploadService
{
    const Vimeo = 1;
    const YouTube = 2;
    const SoundCloud = 3;
}
class ConstUploadStatus
{
    const Success = 1;
    const Processing = 2;
    const Failure = 3;
}
class JobStatus
{
    const Draft = 1;
    const PaymentPending = 2;
    const PendingApproval = 3;
    const Open = 4;
    const CanceledByEmployer = 5;
    const Expired = 6;
    const Archived = 7;
    const CanceledByAdmin = 8;
}
class ActivityType
{
    const ReviewPosted = 2;
    const Notification = 3;
    const JobApply = 5;
    const FollowerPosted = 7;
    const QuoteBidPosted = 9;
    const QuoteBidStatusChanged = 10;
    const QuoteBidAmountChanged = 11;
    const ProjectStatusChanged = 13;
    const ProjectWinnerSelected = 14;
    const ProjectDisputePosted = 15;
    const ProjectBidInvoicePosted = 16;
    const ProjectBidInvoicePaid = 17;
    const MilestonePosted = 18;
    const MilestoneStatuschanged = 19;
    const ContestStatusChanged = 20;
    const ProjectMutualCancelAccept = 23;
    const ProjectMutualCancelReject = 24;
    const ProjectMutualCancelRequest = 25;
    const ProjectBidPosted = 26;
    const ProjectBidFreelancerWithdrawn = 27;
    const ProjectBidStatusChanged = 28;
    const PortfolioComment = 29;
    const ProjectConversation = 30;
    const QuoteConversation = 31;
    const ContestConversation = 32;
    const QuoteBidNotInterestedStatusChanged = 34;
    const ProjectAcceptedToWork = 35;
    const ProjectRejectedToWork = 36;
    const ProjectAttachmentPosted = 37;
    const ProjectDisputeStatusChanged = 38;
    const JobStatusChanged = 39;
    const BidInvite = 40;
    const WithdrawRequested = 41;
    const WithdrawRequestStatusChange = 42;
}
class TransactionType
{
    const AmountAddedToWallet = 1;
    const AdminAddedAmountToUserWallet = 2;
    const AdminDeductedAmountToUserWallet = 3;
    const ProjectListingFee = 4;
    const ProjectMilestonePaymentPaid = 5;
    const ProjectMilestonePaymentReleased = 6;
    const ProjectInvoicePayment = 7;
    const AmountRefundedToWalletForCanceledProjectPayment = 8;
    const ContestListingFee = 9;
    const AmountRefundedToWalletForCanceledContest = 10;
    const AmountRefundedToWalletForRejectedContest = 11;
    const ContestFeaturesUpdatedFee = 12;
    const ContestTimeExtendedFee = 13;
    const AmountMovedToParticipant = 14;
    const JobListingFee = 15;
    const QuoteSubscriptionPlan = 16;
    const ExamFee = 17;
    const WithdrawRequested = 18;
    const WithdrawRequestApproved = 19;
    const WithdrawRequestRejected = 20;
    const WithdrawRequestCommission = 21;
}
class ExamStatus
{
    const Inprogress = 1;
    const Incomplete = 2;
    const Passed = 3;
    const Failed = 4;
    const ExamFeePaymentPending = 5;
    const FeePaidOrNotStarted = 6;
    const SuspendedDueToTakingOvertime = 7;
}
class ProjectStatus
{
    const Draft = 1;
    const PaymentPending = 2;
    const PendingForApproval = 3;
    const OpenForBidding = 4;
    const BiddingExpired = 5;
    const WinnerSelected = 6;
    const BiddingClosed = 9;
    const EmployerCanceled = 10;
    const UnderDevelopment = 11;
    const MutuallyCanceled = 12;
    const CanceledByAdmin = 13;
    const FinalReviewPending = 14;
    const Completed = 15;
    const Closed = 16;
}
class BidStatus
{
    const Pending = 1;
    const Won = 2;
    const Lost = 3;
}
class MilestoneStatus
{
    const Pending = 1;
    const Approved = 2;
    const RequestedForEscrow = 3;
    const EscrowFunded = 4;
    const Completed = 5;
    const RequestedForRelease = 6;
    const EscrowReleased = 7;
    const Canceled = 8;
}
class DiscountTypes
{
    const Percentage = 1;
    const Amount = 2;
}
class ConstDisputeStatus
{
    const Open = 1;
    const UnderDiscussion = 2;
    const WaitingForAdministratorDecision = 3;
    const Closed = 4;
}
class ConstDisputeOpenType
{
    const EmployerGiveMoreWorks = 1;
    const EmployerGivePoorRating = 2;
    const FreelancerWorkNotMatchesRequirement = 3;
    const FreelancerGivePoorRating = 4;
}
class ConstDisputeCloseType
{
    const EmployerGivingMoreWork = 1;
    const CompletGivenWork = 2;
    const EmployerGivenPoorFeedback = 3;
    const EmployerGivenProperFeedback = 4;
    const ItemMatchedProjectDescription = 5;
    const ItemNotMatchedProjectDescription = 6;
    const FreelancerGivenPoorFeedback = 8;
    const FreelancerGivenProperFeedback = 7;
}
