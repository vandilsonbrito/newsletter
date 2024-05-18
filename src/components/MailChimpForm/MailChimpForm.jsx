import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "../CustomForm/CustomForm";

export default function MailChimpForm() {

    const PUBLIC_ID = import.meta.env.VITE_PUBLIC_ID;
    const U_VALUE = import.meta.env.VITE_U_VALUE; 
    const formPostUrl = `https://app.us18.list-manage.com/subscribe/post?u=${U_VALUE}&id=${PUBLIC_ID}`;

  return (
    <div>
        <MailchimpSubscribe
            url={formPostUrl}
            render={({ subscribe, status, message }) => (
                <CustomForm
                    status={status} 
                    message={message}
                    onValidated={formData => subscribe(formData)}
                />
            )}
        />
    </div>
  )
}
