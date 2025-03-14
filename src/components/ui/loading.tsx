import React from "react";


export default function LoadingIndicator() {
return (
<div aria-label="Loading"
     className="relative inline-flex flex-col gap-2 items-center justify-center">
    <div className="relative flex w-10 h-10">
        <i
            className="absolute w-full h-full rounded-full border-2 border-b-primary animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent">
        </i>
        <i
            className="absolute w-full h-full rounded-full border-2 border-b-primary opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent">
        </i>
    </div>
</div>
)
}
