# Security policy

## Reporting a vulnerability

If you believe you've found a security issue in [CalculatorAI](https://calculatorai.app), please report it privately through the **[contact page](https://calculatorai.app/support/contact)** rather than opening a public issue.

Please include:

- what you found, and where (URL or endpoint),
- steps to reproduce,
- the impact you believe it has,
- anything you'd like credited if we publish a fix note.

Please allow a reasonable window to ship a fix before disclosing publicly. Responsible disclosure is genuinely appreciated.

## Scope

In scope: `calculatorai.app` and its subdomains, and the embeddable widget at `calculatorai.app/embed/*`.

Out of scope: this documentation repository (open an issue instead), third-party services CalculatorAI builds on — report those to [Supabase](https://supabase.com/security), [Vercel](https://vercel.com/security), [Stripe](https://stripe.com/docs/security) or [Anthropic](https://www.anthropic.com/) directly.

## How the platform is secured

Encryption in transit and at rest, Postgres row-level security isolating every account, read-only-only exchange and wallet connections, and no AI training on user data. The full picture is in [docs/security-and-privacy.md](docs/security-and-privacy.md).
