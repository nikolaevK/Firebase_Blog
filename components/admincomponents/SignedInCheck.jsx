import Link from "next/link";
import React, { useContext } from "react";
import { UserContext } from "../../context/context";

export default function SignedInCheck(props) {
  const { username } = useContext(UserContext);

  return username
    ? props.children
    : props.fallback || (
        <Link href="/enter">Please login into your account</Link>
      );
}
