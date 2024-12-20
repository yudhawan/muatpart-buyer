import React from "react";

export function UserProfile() {
  return (
    <div className="flex gap-3 items-center p-2 w-full text-xs font-semibold leading-tight bg-sky-100 rounded-lg text-zinc-900">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/60cdcdaf919148d9b5b739827a6f5b2a/551141daa0bf787e21ce5c55c678462b5bdec1b5feced47e19cfda3c431d104f?apiKey=60cdcdaf919148d9b5b739827a6f5b2a&"
        alt="User profile"
        className="object-contain shrink-0 self-stretch my-auto w-6 rounded-3xl aspect-square"
      />
      <div className="flex-1 shrink gap-3 self-stretch my-auto">
        Carena Learns Prasetyo
      </div>
    </div>
  );
}
