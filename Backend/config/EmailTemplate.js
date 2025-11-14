export const resetPasswordTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Password Reset OTP</title>
<style>
  body {
    background: #ffffff;
    margin: 0;
    padding: 0;
    font-family: "Arial", sans-serif;
    color: #000;
  }

  .container {
    max-width: 600px;
    margin: 0 auto;
    border: 3px solid #000;
    padding: 30px;
  }

  h1 {
    font-size: 32px;
    margin: 0 0 20px 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: -1px;
  }

  .otp-box {
    border: 3px dashed #000;
    padding: 20px;
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 30px 0;
  }

  .warning {
    font-size: 14px;
    padding: 10px;
    border: 2px solid #000;
    background: #ffeb3b;
    font-weight: 600;
  }

  a.button {
    display: inline-block;
    margin-top: 25px;
    padding: 12px 20px;
    border: 3px solid #000;
    color: #000;
    text-decoration: none;
    font-weight: bold;
    font-size: 16px;
    background: #fff;
  }

  .footer {
    margin-top: 40px;
    font-size: 12px;
    opacity: 0.7;
    border-top: 2px solid #000;
    padding-top: 10px;
  }
</style>
</head>

<body>
  <div class="container">
    <h1>Password Reset</h1>

    <p>You requested to reset your password. Use the OTP below:</p>

    <div class="otp-box">
      {{OTP_CODE}}
    </div>

    <p>This OTP is valid for <strong>15 minutes</strong>. Do not share it with anyone.</p>

    <div class="warning">
      If you didn’t request this reset, ignore this email immediately.
    </div>


    <div class="footer">
      This is an automated email. Please do not reply.
    </div>
  </div>
</body>
</html>

`