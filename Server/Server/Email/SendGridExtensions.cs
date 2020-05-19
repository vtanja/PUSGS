using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.DependencyInjection;
using Server.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Email
{
    public static class SendGridExtensions 
    {
       public static IServiceCollection AddSendGridEmailSender(this IServiceCollection services)
        {
            services.AddTransient<IEmailSender, EmailSender>();

            return services;
        }


    }
}
