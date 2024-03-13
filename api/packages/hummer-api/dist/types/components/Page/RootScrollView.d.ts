import { View as ScrollViewComponent } from "../View";
import { PageOptions } from "./PageOptions";
export declare class RootScrollView extends ScrollViewComponent {
    _onCreate: Function;
    _onReady: Function;
    _onAppear: Function;
    _onDisappear: Function;
    _onDestroy: Function;
    _onBack: Function;
    constructor(options?: PageOptions);
    onCreate(): void;
    onReady(): void;
    onAppear(): void;
    onDisappear(): void;
    onDestroy(): void;
    onBack(): boolean;
}
