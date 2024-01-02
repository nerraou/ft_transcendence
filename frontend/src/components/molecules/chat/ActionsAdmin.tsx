import { MembersData } from "@services/useChannelQuery";

interface ActionsOwnerProps {
  members: MembersData[];
  token: string | unknown;
}

function ActionsOwner(props: ActionsOwnerProps) {
  return <>{props.token}</>;
}

export default ActionsOwner;
