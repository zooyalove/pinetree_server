const createAuthMail = (verify_code: string) => {
  const subject = "Pinetree plant 회원가입 인증코드 송신메일";
  const body = `<div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
    <b style="black">안녕하세요! </b>회원가입을 계속하시려면 하단의 인증코드를 복사하여 PINETREE 프로그램의 인증절차를 진행하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
  </div>
  
  <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem; font-weight: 600;">Verify_code : ${verify_code}</div><br/></div>`;

  return {
    subject,
    body
  };
};

export default createAuthMail;
