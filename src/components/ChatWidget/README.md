# Chat Widget - Zwicky

Este es un widget de chat modular diseñado para ser fácilmente integrado en cualquier aplicación React. El componente principal es `ChatWidget`, que gestiona un chatbot interactivo con soporte multilingüe, navegación jerárquica, y sistema de retroalimentación.

## Instalación

```bash
# Si utilizas npm
npm install zwicky-chat-widget

# Si utilizas yarn
yarn add zwicky-chat-widget
```

## Uso Básico

```jsx
import { ChatWidget } from 'zwicky-chat-widget';
import 'zwicky-chat-widget/dist/styles.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Aplicación</h1>
      </header>
      
      {/* Widget de chat posicionado en la esquina inferior derecha */}
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

## Propiedades

| Propiedad     | Tipo                                               | Valor por defecto           | Descripción                                                   |
|---------------|----------------------------------------------------|-----------------------------|---------------------------------------------------------------|
| position      | 'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' | 'bottom-right'     | Posición del botón y widget en la pantalla                    |
| offset        | number                                             | 20                          | Distancia desde los bordes de la pantalla (en píxeles)        |
| buttonColor   | string                                             | '#FF4E00'                   | Color principal del botón de chat (formato hexadecimal)       |
| widgetTitle   | string                                             | 'Zwicky - Asistente Virtual'| Título que se muestra en la cabecera del chat                 |

## Personalización Avanzada

Para casos de uso más avanzados, el widget ofrece acceso a componentes individuales:

```jsx
import { 
  ChatInterface, 
  ChatButton, 
  useChat 
} from 'zwicky-chat-widget';

function CustomChatImplementation() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isTyping } = useChat();
  
  return (
    <>
      {/* Botón de chat personalizado */}
      <ChatButton 
        onClick={() => setIsOpen(true)} 
        isOpen={isOpen} 
      />
      
      {/* Interfaz de chat que se muestra solo cuando isOpen es true */}
      {isOpen && (
        <ChatInterface onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
```

## Internacionalización

El widget soporta múltiples idiomas (español, inglés, francés). El idioma se puede cambiar desde el selector en la cabecera del chat.

## Estructura de Datos

La estructura de navegación del chat se basa en nodos que contienen:
- ID único
- Mensaje a mostrar
- Opciones de navegación
- Referencia al nodo padre (para navegación hacia atrás)
- Nivel de profundidad en la jerarquía

## Personalización de Estilos

Para personalizar los estilos del widget, puedes sobrescribir las clases CSS correspondientes:

```css
/* Personalizar colores */
.option-button {
  border-color: #your-custom-color !important;
  background-color: #your-custom-bg-color !important;
}

/* Personalizar tamaños */
.chat-container {
  height: 600px !important;
  width: 400px !important;
}
```

## Configuración del Servidor

Para que el widget funcione correctamente, es necesario configurar las siguientes rutas en el servidor:

- `GET /api/chat/node/:nodeId` - Obtener un nodo específico por ID
- `GET /api/chat/node/welcome` - Obtener el nodo inicial
- `POST /api/chat/response` - Procesar una respuesta del usuario

El widget espera que las respuestas del servidor tengan el siguiente formato:

```json
{
  "id": "node_id",
  "message": "Mensaje a mostrar",
  "options": [
    {
      "label": "Opción 1",
      "value": "opcion_1",
      "nextNodeId": "siguiente_nodo_id"
    },
    // Más opciones...
  ],
  "parentId": "nodo_padre_id",
  "type": "menu",
  "breadcrumbs": ["welcome", "menu_principal", "submenu"],
  "level": 2
}
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.