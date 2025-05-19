# Showcase - Zwicky Chat Widget

## Componentes Visuales

### Widget Completo
![Widget Completo](attached_assets/image_1746546174341.png)

### Menú Principal 
![Menú Principal](attached_assets/image_1746546872857.png)

### Navegación Jerárquica
![Navegación Jerárquica](attached_assets/image_1746546892084.png)

### Retroalimentación
![Retroalimentación](attached_assets/image_1746552925584.png)

## Características Destacadas

### 1. Navegación Multinivel
- Estructura jerárquica con niveles ilimitados
- Breadcrumbs para facilitar la contextualización 
- Botones de navegación adaptativos según el nivel

### 2. Internacionalización
- Soporte nativo para español, inglés y francés
- Sistema escalable para añadir más idiomas
- Traducción dinámica de mensajes y opciones

### 3. Diseño Adaptable
- Funciona en dispositivos móviles y escritorio
- Posicionamiento flexible (4 esquinas)
- Personalizable mediante props

### 4. Sistema de Feedback
- Iconos de pulgares arriba/abajo para valoraciones
- Almacenamiento de valoraciones para análisis
- Identificación de nodos problemáticos

### 5. Exportabilidad
- Empaquetado como módulo autónomo
- Fácil integración en cualquier proyecto React
- Documentación completa de uso

## Estructura Modular

```
ChatWidget/
├── ChatWidget.tsx        # Componente principal
├── ChatButton.tsx        # Botón flotante
├── ChatHeader.tsx        # Cabecera con título y controles
├── ChatInterface.tsx     # Interfaz de chat completa
├── ChatInput.tsx         # Campo de entrada de texto
├── ChatMessage.tsx       # Mensajes individuales
├── FeedbackButtons.tsx   # Botones de valoración
├── LanguageSelector.tsx  # Selector de idiomas
├── MenuOptions.tsx       # Opciones de menú
├── NavigationOptions.tsx # Botones de navegación
├── hooks/
│   └── useChat.tsx       # Lógica principal del chat
└── index.ts              # Punto de entrada y exportaciones
```

## APIs y Puntos de Integración

### Endpoints Requeridos

```
GET    /api/chat/node/:nodeId     # Obtener nodo específico
GET    /api/chat/node/welcome     # Obtener nodo inicial
POST   /api/chat/response         # Procesar respuesta
POST   /api/chat/feedback         # Almacenar valoración
```

### Formato de Datos

```typescript
// Estructura de un nodo de chat
interface ChatNode {
  id: string;
  message: string;
  options?: Option[];
  parentId?: string;
  type?: string;
  breadcrumbs?: string[];
  level?: number;
}

// Estructura de una opción de navegación
interface Option {
  label: string;
  value: string;
  nextNodeId: string;
}
```

## Ejemplo de Integración

```jsx
import { ChatWidget } from '@asteroid-tech/zwicky-chat';

function App() {
  return (
    <div className="my-application">
      {/* Contenido de la aplicación */}
      
      {/* Widget de chat */}
      <ChatWidget 
        position="bottom-right"
        offset={20}
        buttonColor="#FF4E00"
        widgetTitle="Zwicky - Asistente Virtual"
      />
    </div>
  );
}
```