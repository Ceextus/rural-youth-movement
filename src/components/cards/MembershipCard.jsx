import Image from "next/image";

export default function MembershipCard({ member, baseUrl = "https://ruralyouthmovement.netlify.app" }) {
  if (!member) return null;

  const status = member.status || "pending";
  const isApproved = status === "approved";
  
  // Format Member ID
  let displayId = member.member_code;
  if (!displayId) {
    displayId = member.id 
      ? `RYM-${member.id.slice(0, 8).toUpperCase()}` 
      : "PENDING-VERIFICATION";
  }

  const region = member.state || "National Registry";
  
  // QR Code URL (pointing to the verification page)
  const verifyUrl = `${baseUrl}/verify/${member.id}`;
  const qrCodeUrl = `/api/qr?data=${encodeURIComponent(verifyUrl)}`;

  return (
    <div className="w-full max-w-sm mx-auto bg-surface-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-outline-variant/30 relative font-sans">
      {/* Header Banner */}
      <div className="h-14 bg-primary flex items-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--color-primary-container),_transparent_70%)]" />
        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-surface-white shrink-0" aria-hidden="true">
          <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.2 15L7 12.2l1.4-1.4 2.4 2.4 4.8-4.8L17 9.8 10.8 16z" />
        </svg>
        <h3 className="font-headline-sm text-surface-white text-[16px] tracking-wide">
          RYM OFFICIAL MEMBER
        </h3>
      </div>

      {/* Main Card Body */}
      <div className="p-5 flex gap-4">
        {/* Photo Column */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="w-24 h-28 rounded-lg bg-surface-container-low border border-outline-variant/50 overflow-hidden relative shadow-inner">
            {member.photo_url ? (
              <img 
                src={member.photo_url} 
                alt="Member Photo" 
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant/40">
                <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" aria-hidden="true">
                  <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.42 0-8 2.24-8 5v3h16v-3c0-2.76-3.58-5-8-5z" />
                </svg>
              </div>
            )}
          </div>
          
          {/* Status Badge */}
          <div className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
            isApproved 
              ? "bg-primary-container text-primary border-primary/20" 
              : "bg-surface-variant text-on-surface-variant border-outline-variant/30"
          }`}>
            {status}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex-1 min-w-0 pt-1">
          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">
            Full Name
          </p>
          <h4 className="font-headline-sm text-[16px] text-on-background leading-tight mb-2 truncate">
            {member.first_name} {member.last_name}
          </h4>

          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">
            Member ID
          </p>
          <p className="font-body-md text-[13px] font-mono text-on-surface bg-surface-container-low px-1.5 py-0.5 rounded inline-block mb-2 border border-outline-variant/20">
            {displayId}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">Phone</p>
              <p className="font-body-sm text-[12px] text-on-surface truncate">{member.phone}</p>
            </div>
            <div>
              <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">LGA</p>
              <p className="font-body-sm text-[12px] text-on-surface truncate">{member.lga || "N/A"}</p>
            </div>
          </div>

          <p className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-widest mb-0.5">
            State Chapter
          </p>
          <p className="font-body-sm text-[12px] text-on-surface truncate">
            {region}
          </p>
        </div>
      </div>

      {/* Footer / QR Code */}
      <div className="border-t border-dashed border-outline-variant/40 bg-surface-container-lowest p-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-label-sm text-[10px] text-on-surface-variant/80 uppercase tracking-widest mb-1">
            Verification
          </p>
          <p className="font-body-sm text-[11px] text-on-surface-variant leading-tight">
            {isApproved 
              ? "Scan QR code to verify this official RYM membership." 
              : "Membership is pending approval. QR verification disabled."}
          </p>
        </div>
        <div className={`shrink-0 p-1 bg-white rounded border border-outline-variant/30 shadow-sm ${!isApproved ? 'opacity-30 grayscale' : ''}`}>
          <img 
            src={qrCodeUrl} 
            alt="Verification QR" 
            className="w-[60px] h-[60px]"
            crossOrigin="anonymous" 
          />
        </div>
      </div>
    </div>
  );
}
