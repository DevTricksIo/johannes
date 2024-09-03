import './assets/css/main.css';
import { UIBuilder } from './builders/UIBuilder';
import { CommandDispatcher } from './commands/CommandDispatcher';
import { ShortcutListeners } from './core/ShortcutListeners';
import { TableListeners } from './core/listeners/TableListeners';
import { QuickMenu } from './components/quick-menu/QuickMenu';
import { DependencyContainer } from './core/DependencyContainer';
import { FocusStack } from './core/FocusStack';
import { BlockOperationsService } from './services/block-operations/BlockOperationsService';
import { ElementFactoryService } from './services/element-factory/ElementFactoryService';
import { TextOperationsService } from './services/text-operations/TextOperationsService';
import { TableOperationsService } from './services/table-operations/TableOperationsService';
import { TableContextFloatingToolbar } from './components/floating-toolbar/TableContextFloatingToolbar';
import { Memento } from './core/Memento';
import { EditableNavigation } from './core/EditableNavigation';
import { BlockToolbox } from './components/block-toolbox/BlockToolbox';

/**
 * This script initializes the editor and sets up event listeners once the DOM content has fully loaded.
 * It is responsible for building the user interface and starting the event listening process to handle commands.
 *
 * The `DOMContentLoaded` event ensures that all the DOM content has been fully parsed and loaded before the initialization begins.
 * `UIBuilder.build().start();` is used to construct and activate the user interface.
 * `CommandDispatcher.getInstance().listen();` retrieves an instance of the CommandDispatcher and starts listening for events.
 */
document.addEventListener('DOMContentLoaded', function () {

    DependencyContainer.Instance.register("IMemento", () => Memento.getInstance());
    DependencyContainer.Instance.register("IShortcutListeners", () => ShortcutListeners.getInstance());
    DependencyContainer.Instance.register("ITableListeners", () => TableListeners.getInstance());

    DependencyContainer.Instance.register("IFocusStack", () => FocusStack.getInstance());
    DependencyContainer.Instance.register("IElementFactoryService", () => ElementFactoryService.getInstance());
    DependencyContainer.Instance.register("ITextOperationsService", () => TextOperationsService.getInstance());
    DependencyContainer.Instance.register("ITableOperationsService", () => TableOperationsService.getInstance());
    DependencyContainer.Instance.register("IBlockOperationsService", () => BlockOperationsService.getInstance());

    //UserInterface
    DependencyContainer.Instance.register("IQuickMenu", () => QuickMenu.getInstance());
    DependencyContainer.Instance.register("ITableContextFloatingToolbar", () => TableContextFloatingToolbar.getInstance());
    DependencyContainer.Instance.register("IEditableNavigation", () => EditableNavigation.getInstance());

    UIBuilder.build().start();

    CommandDispatcher.getInstance().listen();
    EditableNavigation.getInstance().listen();
    BlockToolbox.getInstance().listen();

    document.dispatchEvent(new Event("TextEditorLoaded"));

});