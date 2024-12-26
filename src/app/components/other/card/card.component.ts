import { Component, computed, inject, Input, ViewEncapsulation } from "@angular/core";
import { Member } from "../../../models/member";
import { RouterModule } from "@angular/router";
import { LikesService } from "../../../_services/likes.service";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [RouterModule],
    templateUrl: "./card.component.html",
    styleUrl: "./card.component.css",
})
export class CardComponent {
    //here ! means it is not null
    @Input() userData!: Member;

    private likedService = inject(LikesService);
    hasLiked = computed(() => this.likedService.likeIds().includes(this.userData.id));

    toggleLike() {
        this.likedService.toggleLike(this.userData.id).subscribe({
            next: () => {
                if (this.hasLiked()) {
                    this.likedService.likeIds.update((ids) =>
                        ids.filter((x) => x !== this.userData.id)
                    );
                } else {
                    this.likedService.likeIds.update((ids) => [...ids, this.userData.id]);
                }
            },
        });
    }
}
