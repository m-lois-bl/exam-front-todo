import Button from "./Button";

export default function SentryTestComponent() {
      const handleCrash = () => {
        console.log("Erreur test Sentry")
        throw new Error("Sentry Test Error");

      };

      return <Button onClickFn={handleCrash} text="Sentry Test"/>;
    }