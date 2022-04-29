import styled from "@emotion/styled";
/*
外形像链接的按钮
 */
const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: #f90;
  cursor: pointer;
`;

export default function LinkButton(props: any) {
  return <Button {...props}></Button>;
}
