"use client"
import { submitRepairRequest } from "helpers/serverFunctions"
import { useFormState } from "react-dom"

export default function RepairsForm() {
  const [state, formAction] = useFormState(submitRepairRequest, null)

  return (
    <form action={formAction}>
      <fieldset className="flex flex-col gap-4  mt-12 ">
        {/* Success Message */}
        {state?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded my-4">
            <p className="font-bold">Success! {state.message}</p>
          </div>
        )}

        {/* Error Message */}
        {state?.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
            <p className="font-bold">Error! {state.error}</p>
          </div>
        )}
        {/* Honeypot field - hidden from users but bots might fill it */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />

        <label className="flex flex-col gap-1" style={{ fontSize: "1.5rem" }}>
          Name
          <input
            type="text"
            name="name"
            className="text-black rounded-sm p-1 text-xl"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="Jane Lastname"
          />
        </label>

        {/* Email and Phone on same line for desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1" style={{ fontSize: "1.5rem" }}>
            Email
            <input
              type="email"
              name="email"
              className="text-black rounded-sm p-1 text-xl"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="hunter2@example.com"
            />
          </label>
          <label className="flex flex-col gap-1" style={{ fontSize: "1.5rem" }}>
            Phone
            <input
              type="tel"
              name="phone"
              className="text-black rounded-sm p-1 text-xl"
              required
              autoComplete="tel"
              maxLength={20}
              pattern="[\+]?[0-9\s\-\(\)]{10,20}"
              title="Please enter a valid phone number"
              placeholder="5551234567"
            />
          </label>
        </div>
        <fieldset
          className="flex flex-col gap-2"
          style={{ fontSize: "1.5rem" }}
        >
          <legend style={{ fontSize: "1.5rem" }}>
            Preferred Contact Method
          </legend>
          <label
            className="flex items-center gap-2 font-mono"
            style={{ fontSize: "1.5rem" }}
          >
            <input type="radio" name="contact-method" value="email" required />
            Email
          </label>
          <label
            className="flex items-center gap-2 font-mono"
            style={{ fontSize: "1.5rem" }}
          >
            <input type="radio" name="contact-method" value="phone" required />
            Phone
          </label>
        </fieldset>
        <label
          className="flex flex-col gap-1  mt-2"
          style={{ fontSize: "1.5rem" }}
        >
          Item for Repair
          <input
            type="text"
            name="item"
            className="text-black rounded-sm p-1 text-xl mt-1"
            required
            maxLength={500}
            placeholder="Guitar pedal, amplifier, etc."
          />
        </label>
        <label className="flex flex-col gap-1" style={{ fontSize: "1.5rem" }}>
          Describe the Issue
          <textarea
            name="issue"
            className="text-black rounded-sm p-1 text-xl mt-1"
            rows={4}
            required
            maxLength={2000}
            placeholder="The thingamabobber isn't thingamabobbing."
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-yellow-600 text-black font-bold py-2 px-4 rounded-sm hover:bg-yellow-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={state?.success}
        >
          {state?.success ? "Request Submitted" : "Submit"}
        </button>
      </fieldset>
    </form>
  )
}
