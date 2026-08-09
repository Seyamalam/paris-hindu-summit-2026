type BankSettings = {
  bankAccountLabel?: string
  bankName?: string
  bankAccountName?: string
  bankIban?: string
  bankBic?: string
  usBankAccountLabel?: string
  usBankName?: string
  usBankAccountName?: string
  usBankRoutingNumber?: string
  usBankAccountNumber?: string
  usBankSwift?: string
} | null

const defaults = {
  bankAccountLabel: "France account",
  bankName: "Credit Industriel et Commercial (CIC Bank)",
  bankAccountName: "Bureau of Human Rights and Justice",
  bankIban: "FR76 3006 6104 5100 0207 8600 151",
  bankBic: "CMCIFRPP",
  usBankAccountLabel: "United States account",
  usBankName: "Fifth Third Bank",
  usBankAccountName: "Forcefield",
  usBankRoutingNumber: "071923909",
  usBankAccountNumber: "10233828",
  usBankSwift: "FTBCUS3CXXX (FTBCUS3C for the 8-character base code)",
}

export function BankAccountCards({ settings }: { settings?: BankSettings }) {
  const accounts = [
    {
      label: settings?.bankAccountLabel ?? defaults.bankAccountLabel,
      region: "EUR · France",
      fields: [
        ["Bank", settings?.bankName ?? defaults.bankName, false],
        ["Account name", settings?.bankAccountName ?? defaults.bankAccountName, false],
        ["IBAN", settings?.bankIban ?? defaults.bankIban, true],
        ["BIC", settings?.bankBic ?? defaults.bankBic, true],
      ],
    },
    {
      label: settings?.usBankAccountLabel ?? defaults.usBankAccountLabel,
      region: "USD · United States",
      fields: [
        ["Bank", settings?.usBankName ?? defaults.usBankName, false],
        ["Account name", settings?.usBankAccountName ?? defaults.usBankAccountName, false],
        ["Routing number", settings?.usBankRoutingNumber ?? defaults.usBankRoutingNumber, true],
        ["Account number", settings?.usBankAccountNumber ?? defaults.usBankAccountNumber, true],
        ["SWIFT / BIC", settings?.usBankSwift ?? defaults.usBankSwift, true],
      ],
    },
  ] as const

  return <div className="bank-account-cards">
    {accounts.map((account, index) => <section className="bank-account-card" key={account.region}>
      <header><span>0{index + 1}</span><div><p>{account.region}</p><h4>{account.label}</h4></div></header>
      <dl>
        {account.fields.map(([label, value, monospace]) => <div key={label}>
          <dt>{label}</dt><dd data-monospace={monospace || undefined}>{value}</dd>
        </div>)}
      </dl>
    </section>)}
  </div>
}
