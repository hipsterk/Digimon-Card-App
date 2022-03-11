import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {IDeck} from "../../../models";
import {deleteDeck, setDeck, setSite} from "../../../store/digimon.actions";
import {SITES} from "../../main-page/main-page.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {ExportDeckComponent} from "../export-deck/export-deck.component";

@Component({
  selector: 'digimon-deck-context-menu',
  templateUrl: './deck-context-menu.component.html',
  styleUrls: ['./deck-context-menu.component.css']
})
export class DeckContextMenuComponent {

  constructor(
    public dialog: MatDialog,
    private store: Store,
    public dialogRef: MatDialogRef<DeckContextMenuComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDeck
  ) { }

  viewDeck(): void {
    this.store.dispatch(setDeck({deck: this.data}));
    this.store.dispatch(setSite({site: SITES.DeckBuilder}));
    this.dialogRef.close();
  }

  openExportDialog(): void {
    this.dialog.open(ExportDeckComponent, {data: this.data, width: '90vmin', height: '550px'});
    this.dialogRef.close();
  }

  deleteDeck(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Are you sure?",
        message: "You are about to permanently delete the deck."}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult) {
        this.store.dispatch(deleteDeck({deck: this.data}))
      }
    });

    this.dialogRef.close();
  }
}
