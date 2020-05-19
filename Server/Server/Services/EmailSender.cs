using Microsoft.Extensions.Options;
using Server.Email;
using Server.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Server.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ApplicationSettings _appSettings;

        public EmailSender(IOptions<ApplicationSettings>appSettings)
        {
            this._appSettings = appSettings.Value;
        }

        public async Task<SendEmailResponse> SendEmailAsync(string userEmail, string emailSubject, string message)
        {
            var apiKey = _appSettings.SendGridKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("andjela.ljuban@gmail.com", "Travellix");
            var subject = emailSubject;
            var to = new EmailAddress(userEmail, "Example User");
            var plainTextContent = message;
            var htmlContent = message;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);

            return new SendEmailResponse();
        }
    }
}
