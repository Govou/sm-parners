export interface ManagedAssets{
  pendingReview: Asset[],
  completedReview: Asset[]
}

export interface Asset{
  serviceName: string,
  dateAdded: string,
  plateNumber: string,
  percentageCompleted: number,
  daysLeft: number,
  imageUrl: string
}
