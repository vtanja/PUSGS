#pragma checksum "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8917ceff8ecc63ac34788d67da987b7094236079"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Notifications_EmailConfirmed), @"mvc.1.0.view", @"/Views/Notifications/EmailConfirmed.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8917ceff8ecc63ac34788d67da987b7094236079", @"/Views/Notifications/EmailConfirmed.cshtml")]
    public class Views_Notifications_EmailConfirmed : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
  
    ViewData["Title"] = " Travellix - EmailConfirmed";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
#nullable restore
#line 6 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
  
    ViewData["Title"] = "Techhowdy - Email Confirmation";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"


    <div class=""d-flex justify-content-center"">
        <div class=""card"" style=""width:40%"">
            <div class=""box"" style=""margin:5%"">
                <h2>Thank You!<br><br /><span>Your email has been confirmed.</span></h2>
                <p style=""align-content:center"">
                    In order to have full access to our products and services please change your password.
                </p>
");
            WriteLiteral("\r\n");
            WriteLiteral("\r\n");
#nullable restore
#line 25 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
                 using (Html.BeginForm("ChangeRoute", "Notifications"))
                {

#line default
#line hidden
#nullable disable
            WriteLiteral("                    <input type=\"text\"");
            BeginWriteAttribute("value", " value=\"", 1015, "\"", 1038, 1);
#nullable restore
#line 27 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
WriteAttributeValue("", 1023, ViewBag.userID, 1023, 15, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" hidden name=\"userID\" />\r\n                    <input type=\"text\"");
            BeginWriteAttribute("value", " value=\"", 1103, "\"", 1125, 1);
#nullable restore
#line 28 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
WriteAttributeValue("", 1111, ViewBag.token, 1111, 14, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" hidden name=\"token\" />\r\n                    <input type=\"submit\" class=\"btn btn-primary btn-block\" style=\"background-color:#440d75;width:50%;margin-left:25%\" value=\"CHANGE PASSWORD\" />\r\n");
#nullable restore
#line 30 "C:\Users\vukmi\OneDrive\Dokumenti\GitHub\PUSGS\Server\Server\Views\Notifications\EmailConfirmed.cshtml"
                }

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n");
            WriteLiteral("            </div>\r\n        </div>\r\n    </div>\r\n\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
