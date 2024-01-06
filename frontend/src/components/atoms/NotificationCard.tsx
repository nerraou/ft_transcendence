"use client";

import Link from "next/link";
import { ReactNode } from "react";

function DotsLoader() {
  return (
    <div className="flex space-x-1">
      <div className="w-1 h-1 rounded-full bg-light-bg-primary animate-bounce" />
      <div
        className="w-1 h-1 rounded-full bg-light-bg-primary animate-bounce"
        style={{
          animationDelay: "100ms",
        }}
      />
      <div
        className="w-1 h-1 rounded-full bg-light-bg-primary animate-bounce"
        style={{
          animationDelay: "200ms",
        }}
      />
    </div>
  );
}

interface LinkButtonProps {
  onClick?: () => void;
  title: string;
}

function LinkButton(props: LinkButtonProps) {
  return (
    <button
      className="text-base underline text-light-bg-secondary"
      onClick={props.onClick}
    >
      {props.title}
    </button>
  );
}

interface NotificationChannelInvitation {
  type: "channel-invitation";
  token: string;
  name: string;
}

interface NotificationChannelInvitationCardProps
  extends NotificationChannelInvitation {
  isPending: boolean;
  onJoin: () => void;
}

// {"type":"channel-invitation","token":"token"}
function NotificationChannelInvitationCard(
  props: NotificationChannelInvitationCardProps,
) {
  return (
    <section className="flex flex-col items-start">
      <p className="text-light-fg-primary text-base">
        You have been invited to{" "}
        <span className="text-light-fg-link">#{props.name}</span>
      </p>

      {!props.isPending && (
        <LinkButton onClick={props.onJoin} title="Join now" />
      )}

      {props.isPending && <DotsLoader />}
    </section>
  );
}

interface NotificationMessageCardProps {
  type: "message";
  sender: string;
}

// {"id":3,"type":"message","sender":"username"}
function NotificationMessageCard(props: NotificationMessageCardProps) {
  return (
    <section className="flex flex-col items-start">
      <p className="text-light-fg-primary text-base">
        You have a new message from{" "}
        <span className="text-light-fg-link">{props.sender}</span>
      </p>

      <Link href={`/chat/${props.sender}`}>
        <LinkButton title="Got to chat" />
      </Link>
    </section>
  );
}

export interface NotificationFriendRequest {
  type: "contact";
  id: number;
  sender: string;
  status: "PENDING" | "ACCEPTED";
}

interface NotificationFriendRequestCardProps extends NotificationFriendRequest {
  isPending: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

// {"id":3,"type":"contact","status":"PENDING", sender: "username"}
// {"id":3,"type":"contact","status":"ACCEPTED", sender: "username"}
function NotificationFriendRequestCard(
  props: NotificationFriendRequestCardProps,
) {
  if (props.status == "ACCEPTED") {
    return (
      <section className="flex flex-col items-start">
        <p className="text-light-fg-primary text-base">
          <span className="text-light-fg-link">{props.sender}</span> accepted
          your friend request
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-start">
      <p className="text-light-fg-primary text-base">
        <span className="text-light-fg-link">{props.sender}</span> sent a friend
        request
      </p>

      <div className="flex space-x-2">
        {!props.isPending && (
          <>
            <LinkButton onClick={props.onAccept} title="Accept" />
            <LinkButton onClick={props.onDecline} title="Decline" />
          </>
        )}

        {props.isPending && <DotsLoader />}
      </div>
    </section>
  );
}

interface NotificationContainerProps {
  children: ReactNode | ReactNode[];
}

function NotificationContainer(props: NotificationContainerProps) {
  return (
    <section className="bg-light-fg-tertiary p-4 rounded-lg">
      {props.children}
    </section>
  );
}

export type NotificationCardProps =
  | NotificationChannelInvitationCardProps
  | NotificationMessageCardProps
  | NotificationFriendRequestCardProps;

export default function NotificationCard(props: NotificationCardProps) {
  if (props.type == "contact") {
    return (
      <NotificationContainer>
        <NotificationFriendRequestCard {...props} />
      </NotificationContainer>
    );
  }

  if (props.type == "channel-invitation") {
    return (
      <NotificationContainer>
        <NotificationChannelInvitationCard {...props} />
      </NotificationContainer>
    );
  }

  if (props.type == "message") {
    return (
      <NotificationContainer>
        <NotificationMessageCard {...props} />
      </NotificationContainer>
    );
  }
}
