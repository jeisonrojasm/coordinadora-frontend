export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number',
  label?: string | undefined
}
