import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";

export const Route = createFileRoute("/_auth/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-row min-h-screen w-full bg-background">
      <aside className="flex-1 flex flex-col bg-background items-center justify-center px-8 xl:px-0">
        <div className="max-w-lg space-y-8">
          <div className="space-y-1">
            <h1 className="font-semibold text-3xl">Entrar</h1>
            <p className="text-muted-foreground text-sm">
              Entre com seu e-mail e senha, ou faça o login com sua conta
              google!
            </p>
          </div>

          <Button variant="outline" className="w-full ">
            <img src="/svgs/google.svg" alt="Google logo" className="h-5 w-5" />
            Entrar com google
          </Button>

          <Separator />

          <div className="space-y-5">
            <div>
              <Label htmlFor="email">Endereço de e-mail</Label>
              <Input id="email" placeholder="Insira seu e-mail" />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
              />
            </div>

            <Button className="w-full">Entrar</Button>

            <p className="text-center text-xs text-muted-foreground">
              Esqueceu a senha?
            </p>
            <p className="text-center text-xs text-muted-foreground">
              Ainda não possuí uma conta? Cadastre-se
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 bg-foreground hidden xl:flex flex-col items-center justify-center">
        <div className="max-w-xl flex flex-col items-center gap-20">
          <div className="flex items-center gap-4">
            <div className="bg-background size-16 rounded-md items-center justify-center flex">
              <Scissors size={40} />
            </div>
            <p className="text-muted font-semibold text-4xl">Marquei</p>
          </div>

          <div className="space-y-4">
            <p className="text-muted text-center text-lg">
              "O MARQUEI nasceu para resolver um problema real: a falta de
              organização no dia a dia dos salões de beleza. Queremos que a
              tecnologia trabalhe a favor do seu negócio, e não o contrário."
            </p>

            <p className="text-muted-foreground text-center">
              Diego Krause - CTO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
