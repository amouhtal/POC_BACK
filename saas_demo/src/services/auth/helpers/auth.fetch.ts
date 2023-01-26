import { UserLoginDTO } from '@Services/dto/user/user.dto';
import axios from 'axios';

export async function getLoginTokens(
  realm: string,
  data: UserLoginDTO,
  headers: { headers: { 'Content-Type': string } },
) {
  const response = await axios
    .post(
      `http://localhost:8080/realms/${realm}/protocol/openid-connect/token`,
      data,
      headers,
    )
    .then((data) => data);
  return response.data;
}
