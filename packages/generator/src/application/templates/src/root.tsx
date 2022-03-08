import { ConfirmationRouter } from "@mfe/common/lib/components"

import App from "./app"

export default function Root() {
  return (
    <ConfirmationRouter>
      <App />
    </ConfirmationRouter>
  )
}
