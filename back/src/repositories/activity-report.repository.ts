import { ConflictException, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from '../dto/getQueryDto';
import { ActivityReport } from 'src/schema/activity-report.schema';
import { CreateActivityReportDto } from 'src/modules/activity-report/dto/createActivityReport.dto';
import { UpdateActivityReportDto } from 'src/modules/activity-report/dto/updateActivityReport.dto';

export class ActivityReportRepository {
    constructor(@InjectModel(ActivityReport.name) private readonly activityReportModel: Model<ActivityReport>) {}

    /**
     * Fetches all users from database
     * @returns {Promise<ActivityReport>} queried user data
     */

    async get(query: GetQueryDto) {
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let activityReports: ActivityReport[];

        try {
            if (limit === 0) {
                activityReports = await this.activityReportModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                activityReports = await this.activityReportModel
                    .find()
                    .populate('user')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (activityReports.length > 0) {
                response = {
                    ok: true,
                    data: activityReports,
                    message: 'Get Users Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No users found!',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * Fetches a activityReport from database by MongooseSchema ObjectId
     * @param {string} id
     * @returns {Promise<ActivityReport>} queried activityReport data
     */

    async getActivityReportById(id: MongooseSchema.Types.ObjectId): Promise<ActivityReport> {
        try {
            const activityReport: any = await this.activityReportModel.findById(id);
            if (!activityReport) {
                throw new NotFoundException(`ActivityReport with ID: ${id} Not Found`);
            }
            return activityReport;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getActivityReportByFolder(id: MongooseSchema.Types.ObjectId): Promise<ActivityReport> {
        try {
            const activityReports: any = await this.activityReportModel
                .where({ folder: id })
                .sort({ createdAt: -1 })
                .exec();
            return activityReports;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async createActivityReport(createActivityReportDto: CreateActivityReportDto) {
        const { name, acteType, fileURI, folder } = createActivityReportDto;
        const newActivityReport = new this.activityReportModel({
            name: name,
            activityReportType: acteType,
            fileURI: fileURI,
            folder: folder,
        });
        try {
            return await newActivityReport.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateActivityReport(id, updateActivityReportDto: UpdateActivityReportDto) {
        const { name, acteType, fileURI } = updateActivityReportDto;
        try {
            const activityReport = await this.activityReportModel
                .findOneAndUpdate(
                    { _id: id },
                    {  name, acteType, fileURI, updatedAt: new Date() },
                    {
                        new: true,
                    },
                )
                .exec();
            return activityReport;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async deleteActivityReport(id: MongooseSchema.Types.ObjectId) {
        await this.activityReportModel.deleteOne({ id });
    }
}
