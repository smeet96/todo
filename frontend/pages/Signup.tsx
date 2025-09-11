import { Button } from "../components/Button";
import { Input } from "../components/Input";

export const Signup = (): React.JSX.Element => {
 
  return (
    <section className="bg-white dark:bg-white">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                   <Input placeholder="john"  label="Your Name" type="text"/>
                   <Input placeholder="john@gmail.com"  label="email" type="email"/>
                   <Input placeholder="......"  label="Passowrd" type="password"/>
                  <Button button="create an account" />
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
};

export default Signup
