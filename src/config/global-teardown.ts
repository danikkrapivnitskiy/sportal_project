import notificationService from '../services/notification.service';

export default async function () {
  if (process.env.ENVIRONMENT === 'ci') {
    await notificationService.postNotification(
      `Test run funished:\n link to report: https://maximus2806.github.io/SPortal_PW_Project/allure-report/#`
    );
  }
}
