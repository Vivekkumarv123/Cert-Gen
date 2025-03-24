import CertificatePreview from "@/components/Certificate/CertificatePreview";
import { Suspense } from "react";
import React from 'react'

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <CertificatePreview />
      </Suspense>
    </div>
  )
}

export default page
