interface UserFormData{
  name: string;
  uid: string;
  email: string;
  password: string;
  profileURL: string;
  isVerified: boolean;
  createdAt: Date;
}
interface SafeUser{
  name: string;
  uid: string;
  email: string;

  profileURL: string;
  isVerified: boolean;
  createdAt: Date;
}
interface listingFormData {

  title: string;
  description: string;
  price: number;
  imageUrls: string[];
  sellerId: string;

}