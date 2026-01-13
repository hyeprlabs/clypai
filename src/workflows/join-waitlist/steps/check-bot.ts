import { checkBotId } from "botid/server";
import { FatalError } from "workflow";

export async function checkBot() {
  "use step";

  const { isBot } = await checkBotId();

  if (isBot) {
    throw new FatalError("Access denied"); 
  }
}