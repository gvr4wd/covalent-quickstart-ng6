"use strict";
import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import "rxjs/add/operator/catch";
import {CompleterData, CompleterItem, CtrCompleter, RemoteData} from "ng2-completer";

export const MAX_CHARS = 524288;  // the default max length per the html maxlength attribute
export const MIN_SEARCH_LENGTH = 3;
export const PAUSE = 10;
export const TEXT_SEARCHING = "Searching...";
export const TEXT_NO_RESULTS = "No results found";
export const CLEAR_TIMEOUT = 50;

export function isNil(value: any) {
    return typeof value === "undefined" || value === null;
}


const noop = () => { };

const COMPLETER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CompleterCmpMd),
    multi: true
};



@Component({
    selector: "ng2-completer-md",
    templateUrl: "./completer-cmp-md.html",
    styleUrls: ["./completer-cmp-md.scss"],
    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
})
export class CompleterCmpMd implements OnInit, ControlValueAccessor {
    @Input() public dataService: CompleterData;
    @Input() public datasource: RemoteData;
    @Input() public inputName = "";
    @Input() public pause = PAUSE;
    @Input() public minSearchLength = MIN_SEARCH_LENGTH;
    @Input() public maxChars = MAX_CHARS;
    @Input() public overrideSuggested = false;
    @Input() public fillHighlighted = true;
    @Input() public clearSelected = false;
    @Input() public placeholder = "";
    @Input() public matchClass: string;
    @Input() public textSearching = TEXT_SEARCHING;
    @Input() public textNoResults = TEXT_NO_RESULTS;
    @Input() public fieldTabindex: number;
    @Input() public autoMatch = false;
    @Input() public disableInput = false;

    @Input() public openOnFocus = false;
    @Input() public autoHighlight = false;
    @Input() public selectOnFocus = false;

    @Output() public selected = new EventEmitter<CompleterItem>();
    @Output() public highlighted = new EventEmitter<CompleterItem>();
    @Output() public blur = new EventEmitter<void>();

    public displaySearching = true;
    public searchStr = "";

    @ViewChild(CtrCompleter) private completer: CtrCompleter;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;

    constructor() { }

    get value(): any { return this.searchStr; };

    set value(v: any) {
        if (v !== this.searchStr) {
            this.searchStr = v;
            this._onChangeCallback(v);
        }
    }

    public onTouched() {
        this._onTouchedCallback();
    }

    public writeValue(value: any) {
        this.searchStr = value;
    }

    public registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    public ngOnInit() {
        this.completer.selected.subscribe((item: CompleterItem) => {
            this.selected.emit(item);
            if (item) {
                this._onChangeCallback(item.title);
            }
        });
        this.completer.highlighted.subscribe((item: CompleterItem) => {
            this.highlighted.emit(item);
        });

        if (this.textSearching === "false") {
            this.displaySearching = false;
        }
    }

    public onBlur() {
        this.blur.emit();
        this.onTouched();
    }
}
