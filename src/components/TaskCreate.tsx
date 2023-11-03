import { useState } from "react";
import { Button } from "./Button";

function useForm() {
  const [status, setStatus] = useState<string>();

  const handleFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const injectedData: Record<string, string | number> = {
      // Here you can specify anything you need to inject dynamically, outside the form. For example:
      // DYNAMIC_DATA_EXAMPLE: 123,
    };

    const inputs = Array.from(form.elements) as HTMLFormElement[];
    const data = inputs
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {} as Record<string, string>
      );

    console.log(data);

    Object.assign(data, injectedData);

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // It's likely a spam/bot submission, so bypass it to validate via captcha challenge old-school style
        if (response.status === 422) {
          // Append dynamically generated keys back to the form
          Object.keys(injectedData).forEach((key) => {
            const el = document.createElement("input");
            el.type = "hidden";
            el.name = key;
            el.value = injectedData[key].toString();

            form.appendChild(el);
          });

          // Let's submit the form again and spammer/bot will be redirected to another page automatically
          // Submitting via javascript will bypass calling this function again
          form.setAttribute("target", "_blank");
          form.submit();

          throw new Error("Please finish the captcha challenge");
        }

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then(() => setStatus("We'll be in touch soon."))
      .catch((err) => setStatus(err.toString()));
  };

  return { status, handleFormSubmit };
}

const FORM_ENDPOINT = "https://to-done-app-backend.fly.dev/api/add-task";

export function TaskCreate() {
  const { status, handleFormSubmit } = useForm();

  if (status) {
    return (
      <div className="md:w-96 md:max-w-full w-full mx-auto">
        <div className="sm:rounded-md p-6 border border-gray-300">
          <div className="text-2xl">Thank you!</div>
          <div className="text-md">{status}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2 border-b">
      <form
        id="task-create-form"
        method="post"
        action={FORM_ENDPOINT}
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-center p-4"
      >
        <h1 className="">Neue Aufgabe</h1>
        <label htmlFor="title">Aufgabe</label>
        <input type="text" name="title" required />
        <label htmlFor="area">Bereich</label>
        <select name="area" required>
          <option value="select">Wähle einen Bereich</option>
          <option value="Arbeitszimmer M">Arbeitszimmer M</option>
          <option value="Arbeitszimmer T">Arbeitszimmer T</option>
          <option value="Badezimmer EG">Badezimmer EG</option>
          <option value="Badezimmer OG">Badezimmer OG</option>
          <option value="Flur EG">Flur EG</option>
          <option value="Flur OG">Flur OG</option>
          <option value="Gästezimmer">Gästezimmer</option>
          <option value="Küche">Küche</option>
          <option value="Keller">Keller</option>
          <option value="Außen">Außen</option>
          <option value="Schlafzimmer">Schlafzimmer</option>
          <option value="Wohnzimmer">Wohnzimmer</option>
        </select>
        <label htmlFor="interval">Intervall in Tagen</label>
        <input type="number" name="interval" required />
        <Button size="icon" variant="ghost" type="submit">
          Aufgabe hinzufügen
        </Button>
      </form>
    </div>
  );
}
