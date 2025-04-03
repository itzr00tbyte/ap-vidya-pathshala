
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradeSelectorProps {
  selectedGrade: string;
  onGradeChange: (value: string) => void;
  isMobile?: boolean;
}

const GradeSelector = ({ selectedGrade, onGradeChange, isMobile = false }: GradeSelectorProps) => {
  return isMobile ? (
    <div className="px-3 py-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Grade
      </label>
      <Select value={selectedGrade} onValueChange={onGradeChange}>
        <SelectTrigger className="w-full bg-ap-light-blue/10 border-0">
          <span className="flex items-center">
            Grade <SelectValue placeholder="6" />
          </span>
        </SelectTrigger>
        <SelectContent>
          {[6, 7, 8, 9, 10].map((grade) => (
            <SelectItem key={grade} value={grade.toString()}>
              Grade {grade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : (
    <Select value={selectedGrade} onValueChange={onGradeChange}>
      <SelectTrigger className="w-[130px] h-9 bg-ap-light-blue/10 border-0 text-ap-blue">
        <span className="flex items-center">
          Grade <SelectValue placeholder="6" />
        </span>
      </SelectTrigger>
      <SelectContent>
        {[6, 7, 8, 9, 10].map((grade) => (
          <SelectItem key={grade} value={grade.toString()}>
            Grade {grade}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default GradeSelector;
