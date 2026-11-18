import { PartnerHub } from '../types';
import { Translations } from '../i18n';

interface PartnersViewProps {
  hubs: PartnerHub[];
  t: Translations;
}

export function PartnersView({ hubs, t }: PartnersViewProps) {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-[#27272a] pb-4">
        <h2 className="text-2xl font-bold text-white uppercase">{t.nav.partners}</h2>
        <p className="mt-1 font-brutal-mono text-xs text-[#A1A1AA]">
          DHAKA (BD) × HANOI &amp; HUNG YEN (VN) × TOKYO, OSAKA &amp; NAGOYA (JP)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hubs.map((hub) => {
          const borderAccent =
            hub.country === 'Bangladesh'
              ? 'border-[#FF5500]'
              : hub.country === 'Vietnam'
                ? 'border-[#10b981]'
                : 'border-[#f59e0b]';
          const textAccent =
            hub.country === 'Bangladesh'
              ? 'text-[#FF5500]'
              : hub.country === 'Vietnam'
                ? 'text-[#10b981]'
                : 'text-[#f59e0b]';

          return (
            <article
              key={hub.id}
              className={`bg-[#121212] border-2 ${borderAccent} p-6 flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-3">
                <div>
                  <p className={`font-brutal-mono text-xs font-bold uppercase ${textAccent}`}>
                    {hub.country} · {hub.city}
                  </p>
                  <h3 className="mt-1 text-2xl font-bold text-white">{hub.organization}</h3>
                </div>
                <p className="text-sm font-semibold text-[#A1A1AA]">{hub.role}</p>
              </div>

              <dl className="space-y-3 border-t-2 border-[#27272a] pt-4 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">COORDINATOR</dt>
                  <dd className="font-bold text-white">{hub.leadCoordinator}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">DESK EMAIL</dt>
                  <dd className="font-brutal-mono text-[#FF5500]">{hub.contactEmail}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">CAPACITY</dt>
                  <dd className="font-brutal-mono font-bold text-white tabular-nums">
                    {hub.activeCenters} HUBS · {hub.currentCapacity} SEATS
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#27272a]">
                  <dt className="font-brutal-mono text-[#A1A1AA] mb-1">SECTORS</dt>
                  <dd className="text-white font-semibold leading-relaxed">{hub.focusPrograms}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
