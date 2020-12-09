-- CreateTable
CREATE TABLE "Personnel" (
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "supervisor_id" TEXT,

    PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "truck_id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "truck_type" TEXT NOT NULL,

    PRIMARY KEY ("truck_id")
);

-- CreateTable
CREATE TABLE "MaintenanceRecord" (
    "truck_id" TEXT NOT NULL,
    "service_date" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("truck_id","service_date")
);

-- CreateTable
CREATE TABLE "Container" (
    "container_id" TEXT NOT NULL,
    "container_type" TEXT NOT NULL,
    "date_when_built" TEXT NOT NULL,

    PRIMARY KEY ("container_id")
);

-- CreateTable
CREATE TABLE "WasteType" (
    "waste_type" TEXT NOT NULL,

    PRIMARY KEY ("waste_type")
);

-- CreateTable
CREATE TABLE "ContainerWasteType" (
    "container_id" TEXT NOT NULL,
    "waste_type" TEXT NOT NULL,

    PRIMARY KEY ("container_id","waste_type")
);

-- CreateTable
CREATE TABLE "AccountManager" (
    "pid" TEXT NOT NULL,
    "manager_title" TEXT NOT NULL,
    "office_location" TEXT NOT NULL,

    PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Driver" (
    "pid" TEXT NOT NULL,
    "certification" TEXT NOT NULL,
    "owned_truck_id" TEXT,

    PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Account" (
    "account_no" TEXT NOT NULL,
    "account_mgr" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "contact_info" TEXT NOT NULL,
    "customer_type" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "total_amount" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("account_no")
);

-- CreateTable
CREATE TABLE "ServiceAgreement" (
    "service_no" TEXT NOT NULL,
    "master_account" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "waste_type" TEXT NOT NULL,
    "pick_up_schedule" TEXT NOT NULL,
    "local_contact" TEXT NOT NULL,
    "internal_cost" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("master_account","service_no")
);

-- CreateTable
CREATE TABLE "ServiceFulfillment" (
    "date_time" TEXT NOT NULL,
    "master_account" TEXT NOT NULL,
    "service_no" TEXT NOT NULL,
    "truck_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "cid_drop_off" TEXT NOT NULL,
    "cid_pick_up" TEXT NOT NULL,

    PRIMARY KEY ("date_time","master_account","service_no","truck_id","driver_id","cid_drop_off","cid_pick_up")
);

-- AddForeignKey
ALTER TABLE "MaintenanceRecord" ADD FOREIGN KEY("truck_id")REFERENCES "Truck"("truck_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContainerWasteType" ADD FOREIGN KEY("container_id")REFERENCES "Container"("container_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountManager" ADD FOREIGN KEY("pid")REFERENCES "Personnel"("pid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD FOREIGN KEY("pid")REFERENCES "Personnel"("pid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD FOREIGN KEY("account_mgr")REFERENCES "AccountManager"("pid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAgreement" ADD FOREIGN KEY("master_account")REFERENCES "Account"("account_no") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceAgreement" ADD FOREIGN KEY("waste_type")REFERENCES "WasteType"("waste_type") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFulfillment" ADD FOREIGN KEY("truck_id")REFERENCES "Truck"("truck_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceFulfillment" ADD FOREIGN KEY("driver_id")REFERENCES "Driver"("pid") ON DELETE CASCADE ON UPDATE CASCADE;
