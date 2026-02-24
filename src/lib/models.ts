export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  free: boolean;
  description: string;
  strengths: string[];
  costTier: 'grátis' | 'barato' | 'moderado' | 'caro';
  bestFor: string;
}

// All models ordered by approximate benchmark ranking (highest first)
// Ranking based on LMSYS Arena, MMLU-Pro, HumanEval, reasoning benchmarks
export const ALL_MODELS: ModelInfo[] = [
  {
    id: "openrouter/anthropic/claude-4.6-opus-thinking",
    name: "Claude 4.6 Opus Thinking",
    provider: "openrouter",
    free: false,
    description: "Ocupa o topo isolado do ranking global e lidera em testes de raciocínio lógico. Ponto fraco: O custo o torna proibitivo para testes diários.",
    strengths: ["Liderança em raciocínio", "Lógica profunda"],
    costTier: "caro",
    bestFor: "Usar como 'arquiteto-chefe'. Excelente para lidar com infraestruturas complexas de back-end e escalabilidade.",
  },
  {
    id: "openrouter/anthropic/claude-4.5-opus-thinking",
    name: "Claude 4.5 Opus Thinking",
    provider: "openrouter",
    free: false,
    description: "Formidável em matemática e vice-líder no cenário global. Ponto fraco: Por ser da geração anterior, perde ligeiramente a dianteira em lógica profunda.",
    strengths: ["Matemática", "Vice-líder global"],
    costTier: "caro",
    bestFor: "Cálculos pesados e validação estrita de dados estruturados.",
  },
  {
    id: "openrouter/anthropic/claude-4.6-sonnet-thinking",
    name: "Claude 4.6 Sonnet Thinking",
    provider: "openrouter",
    free: false,
    description: "Entrega inteligência de alto nível sendo mais rápido e fluente que os modelos Opus. Ponto fraco: Leve queda de rendimento em matemática complexa.",
    strengths: ["Alto nível", "Rápido e fluente"],
    costTier: "caro",
    bestFor: "Ideal pro dia a dia desenvolvendo UIs interativas, componentes modernos e refatoração limpa web.",
  },
  {
    id: "openai/gpt-5.2-high",
    name: "GPT-5.2 High",
    provider: "openai",
    free: false,
    description: "Extremamente competente com matemática/lógica universal e top de linha na análise de dados. Ponto fraco: Desempenho no seguimento estrito de instruções é mais baixo.",
    strengths: ["Matemática", "Lógica universal", "Análise de dados"],
    costTier: "caro",
    bestFor: "Design de algoritmos complexos, cálculos de back-end robustos e tomada de decisão estratégica do sistema.",
  },
  {
    id: "openai/gpt-5.2-codex",
    name: "GPT-5.2 Codex",
    provider: "openai",
    free: false,
    description: "Liderança absoluta no universo de código e otimização para engenharia de software real. Ponto fraco: Vocabulário puramente técnico e configurações de esforço máximo atrasam as respostas.",
    strengths: ["Universo de código", "Engenharia de software", "Refatoração massiva"],
    costTier: "caro",
    bestFor: "Essencial para construir soluções do zero, montar projetos TypeScript robustos com múltiplos arquivos e produtos reais para produção.",
  },
  {
    id: "openai/gpt-5.1-codex-max-high",
    name: "GPT-5.1 Codex Max High",
    provider: "openai",
    free: false,
    description: "Altamente consistentes com contexto longo em ambientes agênticos e código avançado. Ponto fraco: Já substituídos em capacidade plena pela geração 5.2.",
    strengths: ["Contexto longo", "Ambientes agênticos", "Código avançado"],
    costTier: "caro",
    bestFor: "Excelentes se o seu orçamento para a API estiver levemente apertado, permitindo geração de código React/Node.",
  },
  {
    id: "gemini-3-pro-preview-high",
    name: "Gemini 3 Pro Preview",
    provider: "gemini",
    free: false,
    description: "Rei inquestionável do contexto longo (1 milhão de tokens) e fluência multimodal invejável. Ponto fraco: Em raciocínio estrito matemático, perdeu espaço para Opus e GPT.",
    strengths: ["Contexto colossal", "Fluência multimodal", "Compreende vídeos e UIs"],
    costTier: "caro",
    bestFor: "Vibe coding: Entregar guias PDF, UIs completas e o repositório de uma vez para mapear a arquitetura inteira do software.",
  },
  {
    id: "gemini-3-flash-preview-high",
    name: "Gemini 3 Flash Preview",
    provider: "gemini",
    free: true,
    description: "Custo excepcional com raciocínio brilhante para seguimento de instruções em janela de 1M tokens. Ponto fraco: Menor acurácia em codificação complexa sem instruções explícitas.",
    strengths: ["Custo excepcional", "Seguimento de instruções", "Processamento rápido"],
    costTier: "grátis",
    bestFor: "Geração em larga escala de componentes UI simples, criação de mocks de dados em banco e resumos extensivos.",
  },
  {
    id: "openai/gpt-5.1-high",
    name: "GPT-5.1 High",
    provider: "openai",
    free: false,
    description: "Raciocínio de uso geral balanceado e capacidade geral alta. Ponto fraco: Faltam os ajustes específicos focados puramente em engenharia ágil.",
    strengths: ["Raciocínio genérico forte", "Capacidade geral balanceada"],
    costTier: "caro",
    bestFor: "Escrever ótima documentação para as suas APIs ou analisar bases lógicas que não exijam geração severa de código.",
  },
  {
    id: "openai/gpt-5-pro",
    name: "GPT-5 Pro",
    provider: "openai",
    free: false,
    description: "Raciocínio de uso geral balanceado e capacidade geral competitiva para sua classe. Ponto fraco: Ausência de especialização voltada 100% à engenharia de software.",
    strengths: ["Raciocínio balanceado", "Fundamentação geral"],
    costTier: "moderado",
    bestFor: "Documentação de arquitetura avançada e estruturação de conhecimento de projeto sem focar em geração técnica estrita.",
  },
  {
    id: "openrouter/moonshot/kimi-k2.5-thinking",
    name: "Kimi K2.5 Thinking",
    provider: "openrouter",
    free: false,
    description: "Excelente balanço custo/eficiência para raciocínio puro e conversas lógicas do dia a dia. Ponto fraco: Carece de rigor absoluto em exatidão matemática.",
    strengths: ["Balanço custo/eficiência", "Conversas lógicas flexíveis"],
    costTier: "barato",
    bestFor: "Brainstorming para lógica de negócios com um custo altamente acessível.",
  },
  {
    id: "openrouter/zhipu/glm-5",
    name: "GLM 5",
    provider: "openrouter",
    free: false,
    description: "Capacidade de Omnisciência brilhante para reter contexto longo, não perde detalhes. Ponto fraco: Mais fraco seguindo instruções explícitas de formatação.",
    strengths: ["Omnisciência", "Retenção de detalhes", "Contexto enorme"],
    costTier: "barato",
    bestFor: "Analisar frameworks open-source volumosos e arquivos monolíticos grandes.",
  },
  {
    id: "openai/gpt-5.1-codex",
    name: "GPT-5.1 Codex",
    provider: "openai",
    free: false,
    description: "Modelo da geração 5.1 altamente consistente para desenvolvimento com longo contexto. Ponto fraco: Capacidade plena ofuscada pela nova geração 5.2.",
    strengths: ["Contexto longo de código", "Ambientes agênticos maduros"],
    costTier: "caro",
    bestFor: "Ótima opção se o orçamento da API estiver levemente apertado, entregando código React/Node de ponta de forma muito proficiente.",
  },
  {
    id: "openrouter/anthropic/claude-4.5-sonnet-thinking",
    name: "Claude Sonnet 4.5 Thinking",
    provider: "openrouter",
    free: false,
    description: "Ótima fluidez para codificação. Ponto fraco: Fica significativamente atrás da geração 4.6 em raciocínio puro.",
    strengths: ["Fluidez de codificação", "Boas métricas genéricas"],
    costTier: "moderado",
    bestFor: "Integração contínua e tarefas padrão de programação.",
  },
  {
    id: "openai/gpt-5-mini-high",
    name: "GPT-5 Mini High",
    provider: "openai",
    free: false,
    description: "Uma maravilha de custo-benefício. Ponto fraco: Desempenho em raciocínio matemático despenca frente aos modelos maiores.",
    strengths: ["Custo-benefício espetacular", "Desempenho decente", "Baixíssima latência"],
    costTier: "barato",
    bestFor: "Perfeito para tarefas rotineiras de baixa complexidade ou como agentes menores no seu fluxo de desenvolvimento web.",
  },
  {
    id: "openrouter/deepseek/deepseek-v3.2-thinking",
    name: "DeepSeek V3.2 Thinking",
    provider: "openrouter",
    free: true,
    description: "Custo insuperavelmente baixo de operação com boa capacidade de lógica básica. Ponto fraco: Escorrega significativamente em tarefas pesadas de matemática e codificação analítica.",
    strengths: ["Custo extremamente baixo", "Boa lógica básica geral"],
    costTier: "grátis",
    bestFor: "Rascunhos rápidos, ideações e traduções enquanto poupa os créditos pesados de LLMs premium.",
  },
  {
    id: "openrouter/xai/grok-4",
    name: "Grok 4",
    provider: "openrouter",
    free: false,
    description: "Ótimo para lidar com conhecimentos amplos e fatos em tempo real. Ponto fraco: Sofre demais com escrita de código e em seguir formatos estruturados. Custo alto.",
    strengths: ["Conhecimentos amplos online", "Fatos em tempo real sem filtros rígidos"],
    costTier: "caro",
    bestFor: "Pesquisas de tendências de mercado, análise abrangente e consultas não-técnicas.",
  },
  {
    id: "openrouter/anthropic/claude-4.1-opus-thinking",
    name: "Claude 4.1 Opus Thinking",
    provider: "openrouter",
    free: false,
    description: "Possui uma ótima base de fluência de linguagem. Ponto fraco: Média global muito baixa perante os lançamentos recentes.",
    strengths: ["Fluência consolidada antiga", "Base estável de texto longo"],
    costTier: "caro",
    bestFor: "Não recomendado atualmente, prefira a linha 4.6.",
  },
  {
    id: "openrouter/moonshot/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    provider: "openrouter",
    free: false,
    description: "Irmão menor do K2.5 com saldo semelhante na eficiência para conversas do dia a dia. Ponto fraco: Carece do rigor matemático mais exato.",
    strengths: ["Lógica simplificada ágil", "Custo ameno"],
    costTier: "barato",
    bestFor: "Brainstorming para validações rápidas lógicas onde exatidão bruta importam menos.",
  },
  {
    id: "openrouter/anthropic/claude-4.5-haiku-thinking",
    name: "Claude Haiku 4.5 Thinking",
    provider: "openrouter",
    free: false,
    description: "Velocidade estonteante e de baixo custo. Ponto fraco: Raciocínio e compreensão caem drasticamente em contextos exigentes.",
    strengths: ["Rápido", "Baixo custo absoluto", "Ótima latência"],
    costTier: "barato",
    bestFor: "Tarefas velozes, chamadas simples de API, triagem de logs de servidores e pequenas edições granulares.",
  },
  {
    id: "perplexity/sonar-deep-research",
    name: "Sonar Deep Research",
    provider: "perplexity",
    free: false,
    description: "O melhor para varreduras exaustivas da web, combinando raciocínio robusto de ponta a ponta. Ponto fraco: Estrutura de cobrança complexa e não desenhado para codificação agêntica local.",
    strengths: ["Varreduras exaustivas da web", "Buscas ativas com lógica acoplada"],
    costTier: "caro",
    bestFor: "Levantar exigências reais, mapear stacks requistadas do exterior e consolidar enormes montantes de pesquisa mercadológica.",
  },
  {
    id: "perplexity/sonar-reasoning-pro",
    name: "Sonar Reasoning Pro",
    provider: "perplexity",
    free: false,
    description: "Respostas fundamentadas com navegação ativa extensa e imenso input. Ponto fraco: Custos de saída punitivos para geração de conteúdos grandes de código.",
    strengths: ["Respostas fundamentadas online", "Contexto imenso até 200k+"],
    costTier: "caro",
    bestFor: "Motores de busca interna para testar ideias de código, onde a garantia de precisão com referências reais supera a necessidade de reescrever texto grande.",
  },
  {
    id: "perplexity/sonar-pro",
    name: "Sonar Pro",
    provider: "perplexity",
    free: false,
    description: "Edição voltada a respostas rápidas fundamentadas por links exatos da web e alto contexto de input. Ponto fraco: Mesmos custos altos que oneram longas saídas (outputs).",
    strengths: ["Busca veloz com precisão de links", "Alta ancoragem"],
    costTier: "moderado",
    bestFor: "Testar paradigmas de implementação rápidos consultando direto nas documentações ativas e vigentes na nuvem.",
  },
  {
    id: "openrouter/bytedance/doubao-seed-code",
    name: "Doubao Seed Code",
    provider: "openrouter",
    free: true,
    description: "Modelo consistente para programação e raciocínio matemático com excelente janela de 256k tokens. Ponto fraco: Desempenho em tarefas práticas do mundo real como agente é baixo.",
    strengths: ["Programação focada", "Matemática", "Contexto 256k"],
    costTier: "grátis",
    bestFor: "Co-piloto diário: gerar componentes Next.js, entender tipagens difíceis no TypeScript e criar base de projetos sem gastar nada.",
  },
  {
    id: "openrouter/lg/k-exaone",
    name: "K-EXAONE",
    provider: "openrouter",
    free: true,
    description: "Taxa de acerto surpreendente em desafios matemáticos complexos e conhecimento científico. Ponto fraco: Sofre em retenção com contextos muito longos e tarefas de agente.",
    strengths: ["Matemática complexa", "Ciência", "Código"],
    costTier: "grátis",
    bestFor: "Tarefas de alta complexidade algorítmica: banco de dados, cálculos financeiros e estruturação pesada no back-end.",
  },
  {
    id: "openrouter/baidu/ernie-5-thinking",
    name: "ERNIE 5.0 Thinking Preview",
    provider: "openrouter",
    free: true,
    description: "O melhor dos três em uso de ferramentas/APIs externas e em programação pura. Reflete antes de codar. Ponto fraco: Raciocínio em contextos muito longos é quase nulo.",
    strengths: ["Ferramentas/APIs", "Programação", "Raciocínio (Thinking)"],
    costTier: "grátis",
    bestFor: "Criar agentes de IA ou acionar APIs. Envie contextos curtos apenas com arquivos estritamente necessários.",
  }
];


// Separate into free (always shown) and paid (need API key)
export const AVAILABLE_MODELS = ALL_MODELS.filter(m => m.free);
export const OPENAI_MODELS = ALL_MODELS.filter(m => m.provider === 'openai');
export const PERPLEXITY_MODELS = ALL_MODELS.filter(m => m.provider === 'perplexity');

// Maps a model ID to its provider key (used by /api/models/status)
export function getModelProvider(modelId: string): string {
  if (modelId.startsWith('openai/')) return 'openai';
  if (modelId.startsWith('perplexity/')) return 'perplexity';
  if (modelId.startsWith('openrouter/')) return 'openrouter';
  if (modelId.startsWith('local/') || modelId.startsWith('lmstudio')) return 'local';
  if (modelId.includes('gemini')) return 'gemini';
  return 'unknown';
}
