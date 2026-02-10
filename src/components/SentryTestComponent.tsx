import Button from "./Button";

export default function SentryTestComponent() {
      const handleCrash = () => {
        // Cette fonction va planter car 'undefined' n'a pas de propriété 'name'
        const user: any = undefined;
        console.log(user.name);
      };

      return <Button onClickFn={handleCrash} text="Sentry Test"/>;
    }