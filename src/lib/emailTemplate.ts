const createAuthMail = (verify_code: string) => {
  const subject = "Pinetree plant 회원가입";
  const body = `<div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #868e96; margin-top: 0.5rem; box-sizing: border-box;">
    <b style="black">안녕하세요! </b>회원가입을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 요청하셨거나, 본인이 요청하지 않았다면, 이 메일을 무시하세요.
  </div>
  
  <a href="http://songsul.iptime.org:5557/verify?verify_code=${verify_code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #845ef7; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">계속하기</a>
  
  <div style="text-align: center; margin-top: 1rem; color: #868e96; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="http://songsul.iptime.org:5557/verify?verify_code=${verify_code}">http://songsul.iptime.org:5557/verify?verify_code=${verify_code}</a></div><br/></div>`;

  return {
    subject,
    body
  };
};

export default createAuthMail;
