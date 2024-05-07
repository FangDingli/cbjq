export {}
declare global {
  interface Window {
    $message?: import('naive-ui').MessageProviderInst
  }
}
