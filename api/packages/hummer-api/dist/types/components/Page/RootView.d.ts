import { View as ViewComponent } from "../../components/View";
import { PageOptions } from "./PageOptions";
export declare class RootView extends ViewComponent {
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
