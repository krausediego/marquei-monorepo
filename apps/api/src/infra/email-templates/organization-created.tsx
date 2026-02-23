import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface OrganizationCreatedEmailProps {
  userName: string;
  establishmentName: string;
  dashboardUrl: string;
  createdAt?: string;
}

export const OrganizationCreatedEmail = ({
  userName = "Diego",
  establishmentName = "Barbearia do João",
  dashboardUrl = "https://app.marquei.com.br/dashboard",
  createdAt = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
}: OrganizationCreatedEmailProps) => {
  return (
    <Html lang="pt-BR">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
      </Head>

      <Preview>
        Seu estabelecimento {establishmentName} foi criado no Marquei.
      </Preview>

      <Body
        style={{
          backgroundColor: "#f4f7fe",
          fontFamily: "Inter, Helvetica, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: 540,
            margin: "40px auto",
            backgroundColor: "#ffffff",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header */}
          <Section style={{ padding: "24px 32px 20px" }}>
            <Row>
              <Column>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#1b2559",
                    margin: 0,
                    letterSpacing: "-0.3px",
                  }}
                >
                  ⚡ MARQUEI
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderColor: "#f1f5f9", margin: 0 }} />

          {/* Body */}
          <Section style={{ padding: "32px 32px 28px" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#f0fdf4",
                color: "#16a34a",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 999,
                border: "1px solid #bbf7d0",
                letterSpacing: "0.03em",
                marginBottom: 20,
              }}
            >
              ● Estabelecimento criado
            </div>

            <Heading
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1b2559",
                margin: "0 0 10px",
                letterSpacing: "-0.4px",
                lineHeight: 1.3,
              }}
            >
              Tudo pronto, {userName}!
            </Heading>

            <Text
              style={{
                fontSize: 15,
                color: "#64748b",
                margin: "0 0 28px",
                lineHeight: 1.65,
              }}
            >
              Seu estabelecimento foi cadastrado com sucesso e já está
              disponível para receber agendamentos pelo{" "}
              <span style={{ color: "#1b2559", fontWeight: 600 }}>MARQUEI</span>
              .
            </Text>

            {/* Establishment Card */}
            <Section
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 12,
                padding: "18px 22px",
                marginBottom: 28,
                border: "1px solid #e2e8f0",
              }}
            >
              <Row>
                <Column>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94a3b8",
                      margin: "0 0 5px",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    Estabelecimento
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1b2559",
                      margin: "0 0 3px",
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {establishmentName}
                  </Text>
                </Column>
                <Column align="right" style={{ verticalAlign: "middle" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {createdAt}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Button
              href={dashboardUrl}
              style={{
                backgroundColor: "#1b2559",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                padding: "13px 28px",
                borderRadius: 10,
                textDecoration: "none",
                display: "inline-block",
                letterSpacing: "-0.1px",
              }}
            >
              Acessar painel →
            </Button>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#f8fafc",
              padding: "18px 32px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Row>
              <Column>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#94a3b8",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  © {new Date().getFullYear()} Marquei. Todos os direitos
                  reservados.
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrganizationCreatedEmail;
