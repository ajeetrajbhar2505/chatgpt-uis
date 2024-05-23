import { Component } from '@angular/core';

@Component({
  selector: 'app-membership-plan',
  templateUrl: './membership-plan.component.html',
  styleUrl: './membership-plan.component.scss'
})
export class MembershipPlanComponent {

  memvershipPlan = {
    monthly: false,
    yearly: false,
    lifetime: true
  }
  totalprice: string = "329.90"

  activateCard(membership: string,totalprice:string) {
    this.totalprice = totalprice
    switch (membership) {
      case 'monthly':
        this.memvershipPlan.monthly = true
        this.memvershipPlan.yearly = false
        this.memvershipPlan.lifetime = false
        break
      case 'yearly':
        this.memvershipPlan.monthly = false
        this.memvershipPlan.yearly = true
        this.memvershipPlan.lifetime = false
        break
      case 'lifetime':
        this.memvershipPlan.monthly = false
        this.memvershipPlan.yearly = false
        this.memvershipPlan.lifetime = true
        break
    }
  }
}
