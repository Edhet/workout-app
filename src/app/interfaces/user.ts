export default interface User {
  uid: string | null | undefined;
  email: string | null | undefined;
  photoURL?: string | null | undefined;
  displayName?: string | null | undefined;
}
