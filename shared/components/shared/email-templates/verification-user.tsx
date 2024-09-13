import * as React from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <h1>Підтвердження електронної пошти💌</h1>

    <p>
      Ваш код підтвердження: <b>{code}</b>
    </p>

    <p>
      Натисніть{" "}
      <a
        href={"http://localhost:3000/api/auth/verify?code=" + code}
        target={"_blank"}
      >
        тут
      </a>{" "}
      щоб підтвердити вашу пошту
    </p>
  </div>
);
