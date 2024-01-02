interface ActionsOwnerProps {
  memberImage: string;
  username: string;
  token: string | unknown;
}

function ActionsOwner(props: ActionsOwnerProps) {
  return <>{props.username}</>;
}

export default ActionsOwner;
