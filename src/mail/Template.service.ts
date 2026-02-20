import { Injectable } from '@nestjs/common';
import { SignUpDto } from 'src/user/dto/signUp.dto';

@Injectable()
export class TemplateService {
  generateHtml(signUpDto: SignUpDto): string {
    return `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Client Contact Request</title>
                <style>
                    /* Prevent iOS and Gmail-specific font resizing */
                    body, table, td, a {
                    -webkit-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                    }

                    /* Remove spacing around the email design */
                    body {
                    margin: 0;
                    padding: 0;
                    width: 100% !important;
                    height: 100% !important;
                    line-height: 1.4;
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    }

                    table {
                    border-collapse: collapse !important;
                    }

                    /* Responsive container */
                    .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border: 1px solid #dddddd;
                    }

                    .header {
                    background-color: #e3511c;
                    color: #ffffff;
                    padding: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    }

                    .content td {
                    padding: 10px 20px;
                    }

                    .label {
                    font-weight: bold;
                    width: 150px;
                    vertical-align: top;
                    }

                    .value {
                    white-space: pre-line;
                    }
                </style>
                </head>
                <body>
                <center>
                   ${signUpDto.fullName} Welcome to car booking portal.
                </center>
                </body>
                </html>
                `;
  }
}
